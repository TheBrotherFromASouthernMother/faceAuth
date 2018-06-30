import dlib
import os
import face_recognition
import sys

directory = os.fsencode("./banned_users");

image = face_recognition.load_image_file(sys.argv[1])
face_locations = face_recognition.face_locations(image)

def compare(filename):
    banned_user = face_recognition.load_image_file("./banned_users/" + filename)
    banned_encoding = face_recognition.face_encodings(banned_user)[0]
    unknown_encoding = face_recognition.face_encodings(image)[0];
    results = face_recognition.compare_faces([banned_encoding], unknown_encoding)
    return results[0]

isUserBanned = False
if (face_locations[0] and len(face_locations) == 1):

    integer_i = 0;
    for file in os.listdir(directory):
        if(integer_i == len(os.listdir(directory))):
            break
        filename = os.fsdecode(file)
        isUserBanned = compare(filename)
        if (isUserBanned == True):
            print(isUserBanned)
            break
        integer_i += 1


if (isUserBanned == False):
    print(isUserBanned)

sys.stdout.flush()
