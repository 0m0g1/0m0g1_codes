extends Control

@onready var shift_edit = $VBoxContainer/HBoxContainer2/shift
@onready var input_edit = $VBoxContainer/MarginContainer/HBoxContainer/input
@onready var display_edit = $VBoxContainer/MarginContainer/HBoxContainer/display
@onready var cipher_selection_button = $VBoxContainer/HBoxContainer/cipher_selection_button

func _on_input_text_changed() -> void:
	var text = input_edit.text
	var text_length = text.length()
	var encrypted_text = ""
	
	for i in range(text_length):
		if i == text_length - 1:
			encrypted_text += "[color=#00eba4]"
		encrypted_text += encrypt_character(text[i])
		if i == text_length - 1:
			encrypted_text += "[/color]"
	
	display_edit.text = encrypted_text


func encrypt_character(_char: String) -> String:
	if cipher_selection_button.selected == 0:
		return ceasar_encrypt_character(_char, int(shift_edit.text))
	elif cipher_selection_button.selected == 1:
		return unicode_encrypt_character(_char)
	return ""

func ceasar_encrypt_character(_char: String, shift : int) -> String:
	var uppercase_character = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	var lowercase_character = "abcdefghijklmnopqrstuvwxyz"
	
	if _char in uppercase_character:
		return uppercase_character[(uppercase_character.find(_char) + shift) % 26]
	elif _char in lowercase_character:
		return lowercase_character[(lowercase_character.find(_char) + shift) % 26]
	return _char

func unicode_encrypt_character(_char: String) -> String:
	return str(_char.unicode_at(0), " ")

func _on_less_pressed() -> void:
	shift_edit.text = str((int(shift_edit.text) - 1) % 26)
	_on_input_text_changed()


func _on_add_pressed() -> void:
	shift_edit.text = str((int(shift_edit.text) + 1) % 26)
	_on_input_text_changed()


func _on_cipher_selection_button_item_selected(index: int) -> void:
	_on_input_text_changed()
