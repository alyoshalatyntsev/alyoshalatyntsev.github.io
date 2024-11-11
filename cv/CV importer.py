import shutil
import os

# Define source and updated destination paths
source_path = r"C:\Users\alyos\Dropbox\NON MATHS\CV\CV.pdf"
destination_path = r"C:\Users\alyos\Dropbox\alyoshalatyntsev.github.io\cv\cv.pdf"

# Check if the source file exists
if os.path.exists(source_path):
    try:
        shutil.copyfile(source_path, destination_path)
        print("File copied successfully.")
    except Exception as e:
        print(f"Error during file copy: {e}")
else:
    print("Source file does not exist.")
