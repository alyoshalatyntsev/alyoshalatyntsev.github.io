import os
import shutil
import pandas as pd
from PyPDF2 import PdfReader

# Load the ODS file
file_path = 'List of pdfs.ods'
df = pd.read_excel(file_path, engine='odf')

# Create Long and Short directories if they don't exist
os.makedirs('Long', exist_ok=True)
os.makedirs('Short', exist_ok=True)

# Iterate over each row in the DataFrame
for index, row in df.iterrows():
    src = row.iloc[0].strip().strip('"')
    dest_dir = 'Long' if row.iloc[2].strip().lower() == 'long' else 'Short'
    dest_file_name = f"{row.iloc[1].strip()}.pdf"
    dest = os.path.join(dest_dir, dest_file_name)
    
    # Check if the source file exists
    if os.path.exists(src):
        try:
            # Copy the file to the new destination
            shutil.copy(src, dest)
            print(f"Copied: {src} to {dest}")
            
            # Count the number of pages in the PDF
            with open(dest, "rb") as file:
                pdf = PdfReader(file)
                num_pages = len(pdf.pages)
            
            # Update the DataFrame
            df.at[index, df.columns[4]] = num_pages
            
        except PermissionError as e:
            print(f"PermissionError: {e} for file {src}")
        except Exception as e:
            print(f"Error: {e} for file {src}")
    else:
        print(f"File not found: {src}")

# Save the updated DataFrame to the ODS file
df.to_excel(file_path, engine='odf', index=False)
