import os
import shutil
import pandas as pd

# Load the ODS file
file_path = 'List of pdfs.ods'
df = pd.read_excel(file_path, engine='odf')

# Create Long and Short directories if they don't exist
os.makedirs('Long', exist_ok=True)
os.makedirs('Short', exist_ok=True)

# Iterate over each row in the DataFrame
for index, row in df.iterrows():
    src = row.iloc[0]
    dest_dir = 'Long' if row.iloc[2].strip().lower() == 'long' else 'Short'
    dest_file_name = f"{row.iloc[1]}.pdf"
    dest = os.path.join(dest_dir, dest_file_name)
    
    # Check if the source file exists
    if os.path.exists(src):
        try:
            # Copy the file to the new destination
            shutil.copy(src, dest)
            print(f"Copied: {src} to {dest}")
        except PermissionError as e:
            print(f"PermissionError: {e} for file {src}")
        except Exception as e:
            print(f"Error: {e} for file {src}")
    else:
        print(f"File not found: {src}")
