import shutil
import os

# Define source and updated destination paths
source_path = r"C:\Users\alyos\Dropbox\NOTES\Research evil scheming\RESAbridged.pdf"
destination_path = r"C:\Users\alyos\Dropbox\alyoshalatyntsev.github.io\planabridged\planabridged.pdf"

# Check if the source file exists
if os.path.exists(source_path):
    try:
        shutil.copyfile(source_path, destination_path)
        print("File copied successfully.")
    except Exception as e:
        print(f"Error during file copy: {e}")
else:
    print("Source file does not exist.")
