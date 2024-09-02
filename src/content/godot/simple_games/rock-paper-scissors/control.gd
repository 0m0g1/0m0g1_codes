extends Control

@onready var wins_label = $CenterContainer/VBoxContainer/HBoxContainer2/HBoxContainer/wins
@onready var losses_label = $CenterContainer/VBoxContainer/HBoxContainer2/HBoxContainer2/losses
@onready var computers_choice_label = $CenterContainer/VBoxContainer/HBoxContainer3/choice
@onready var message_label = $CenterContainer/VBoxContainer/message

var wins = 0
var losses = 0
var choices = ["Rock", "Paper", "Scissors"]

func _on_button_pressed(player_choice: int):
	var computer_choice = randi() % 3
	computers_choice_label.text = choices[computer_choice]

	if player_choice == computer_choice:
		message_label.text = "It's a draw"
	elif (player_choice + 1) % 3 == computer_choice:
		losses += 1
		losses_label.text = str(losses)
		message_label.text = "You lose"
	else:
		wins += 1
		wins_label.text = str(wins)
		message_label.text = "You win"

# Attach this function to buttons representing Rock, Paper, Scissors with arguments 0, 1, 2 respectively


func _on_rock_pressed() -> void:
	_on_button_pressed(0)


func _on_paper_pressed() -> void:
	_on_button_pressed(1)


func _on_scissors_pressed() -> void:
	_on_button_pressed(2)
