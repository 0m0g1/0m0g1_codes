import random
import string

def generate_password(length = 12):
    characters = string.ascii_letters + string.digits + string.punctuation
    password = "".join(random.choice(characters) for i in range(length))
    return password

password_length = int(input("Password length? "))
print(f"Your password is {generate_password(password_length)}")