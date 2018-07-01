import dlib
import os
import face_recognition
import sys

def compareTwoImages(filename, unknown_image):
    banned_user = face_recognition.load_image_file("./banned_users/" + filename)
    banned_encoding = face_recognition.face_encodings(banned_user)[0]
    unknown_encoding = face_recognition.face_encodings(unknown_image)[0];
    results = face_recognition.compare_faces([banned_encoding], unknown_encoding)
    return results[0]

def matchFacesInDirectory(unknown_image):
    isUserBanned = False
    directory = os.fsencode("./banned_users");
    integer_i = 0;
    for file in os.listdir(directory):
        if(integer_i == len(os.listdir(directory))):
            break
        filename = os.fsdecode(file)
        isUserBanned = compareTwoImages(filename, unknown_image)
        if (isUserBanned == True):
            print(isUserBanned)
            break
        integer_i += 1
    if (isUserBanned == False):
        print(isUserBanned)
    return isUserBanned

def runFacialRecognition():

    ErrorCodes = {
        "Code_2": "too many face",
        "Code_3": "no faces"
    }

    image = face_recognition.load_image_file(sys.argv[1])
    face_locations = face_recognition.face_locations(image)
    #TODO: O(n) time complexity currently, will eventually need create subfolders and refactor in order to keep the process from hanging once datasets reach triple digits
    # Idea: create subfolders based on user's skin hue, maybe using TensorFlow. This could significantly speed up the program at larger datasets
    if (face_locations[0] and len(face_locations) == 1):
        matchFacesInDirectory(image)
    elif(len(face_locations) > 1):
        print(ErrorCodes["Code_2"])
    elif (len(face_locations) < 1):
        print(ErrorCodes["Code_3"])

    sys.stdout.flush()

if __name__ == '__main__':
    runFacialRecognition()
