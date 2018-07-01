import sys
sys.path.insert(0, '/Users/christianlowe/.atom/facial-recognition-login')
from app import matchFacesInDirectory
import face_recognition

image = face_recognition.load_image_file("./uploads/face70.jpg");

def testMatchFacesInDirectory():
    assert matchFacesInDirectory(image) == True
