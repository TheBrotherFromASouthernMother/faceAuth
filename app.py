import dlib

from PIL import Image
import face_recognition
import sys


image = face_recognition.load_image_file(sys.argv[1])
face_locations = face_recognition.face_locations(image)

print("I found {} face(s) in this photograph.".format(len(face_locations)))

for face_location in face_locations:

    # Print the location of each face in this image
    top, right, bottom, left = face_location

    # You can access the actual face itself like this:
    face_image = image[top:bottom, left:right]


print(face_locations)
sys.stdout.flush()
