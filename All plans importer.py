import shutil
import os

# Define source and destination paths as a list of tuples
file_paths = [
    (r"C:\Users\alyos\Dropbox\NOTES\Research evil scheming\RES.pdf",
     r"C:\Users\alyos\Dropbox\alyoshalatyntsev.github.io\plan\plan.pdf"),
    (r"C:\Users\alyos\Dropbox\NOTES\Research evil scheming\RESAbridged.pdf",
     r"C:\Users\alyos\Dropbox\alyoshalatyntsev.github.io\planabridged\planabridged.pdf"),
    (r"C:\Users\alyos\Dropbox\NOTES\Research evil scheming\RESSummary.pdf",
     r"C:\Users\alyos\Dropbox\alyoshalatyntsev.github.io\plansummary\plansummary.pdf")
]

# Iterate through file paths and copy each file
for source_path, destination_path in file_paths:
    if os.path.exists(source_path):
        try:
            shutil.copyfile(source_path, destination_path)
            print(f"File copied successfully: {source_path} -> {destination_path}")
        except Exception as e:
            print(f"Error during file copy for {source_path}: {e}")
    else:
        print(f"Source file does not exist: {source_path}")
