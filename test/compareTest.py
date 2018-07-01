import sys
sys.path.insert(0, '/Users/christianlowe/.atom/facial-recognition-login')
from app import compareTwoImages
import face_recognition

image = face_recognition.load_image_file("./uploads/face70.jpg");

def testCompareTwoImages():
    assert compareTwoImages("face69.jpg", image) == True
