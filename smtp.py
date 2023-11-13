import smtplib

#buat objek smtp
server = smtplib.SMTP("smtp.gmail.com", 587)

# Autentikasi
server.login("herzfnf@gmail.com", "herza.com/")

# mengirim pesan
message = """
subject: Hello, World!

this is a test email sent from python.
"""

# kirim email
server.sendmail("herzfnf@gmail.com", "ggindothegamer@gmail.com", message)

# tutup koneksi
server.quit()
