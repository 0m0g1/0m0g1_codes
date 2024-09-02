extends Control

@onready var display_edit = $CenterContainer/VBoxContainer/HBoxContainer/password_display
@onready var copy_button = $CenterContainer/VBoxContainer/HBoxContainer/copy_button
@onready var uppercase_check = $CenterContainer/VBoxContainer/GridContainer/uppercase
@onready var lowercase_check = $CenterContainer/VBoxContainer/GridContainer/lowercase
@onready var numbers_check = $CenterContainer/VBoxContainer/GridContainer/numbers
@onready var characters_check = $CenterContainer/VBoxContainer/GridContainer/characters
@onready var lenght_display = $CenterContainer/VBoxContainer/VBoxContainer/HBoxContainer/length_display
@onready var length_input = $CenterContainer/VBoxContainer/VBoxContainer/length_input

var password = ""


func _on_generate_pressed() -> void:
	password = ""
	var characters = ""
	
	if uppercase_check.button_pressed:
		characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	if lowercase_check.button_pressed:
		characters += "abcdefghijklmnopqrstuvwxyz"
	if numbers_check.button_pressed:
		characters += "0123456789"
	if characters_check.button_pressed:
		characters += "!@#$%^&*()-=_+[];',./{|:}"
	
	for i in range(length_input.value):
		password += characters[randi_range(0, characters.length() - 1)]
	
	display_edit.text = password


func _on_length_input_value_changed(value: float) -> void:
	lenght_display.text = str(value)


func _on_copy_button_pressed() -> void:
	DisplayServer.clipboard_set(password)
