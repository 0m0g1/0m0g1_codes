extends Control

@onready var chat_area = $VBoxContainer/chat_area
@onready var host_button = $VBoxContainer/HBoxContainer/host
@onready var join_button = $VBoxContainer/HBoxContainer/join
@onready var message_edit = $VBoxContainer/HBoxContainer2/message
@onready var send_button = $VBoxContainer/HBoxContainer2/send
@onready var username_edit = $VBoxContainer/HBoxContainer/username

var username = ""

func _on_host_pressed() -> void:
	var peer = ENetMultiplayerPeer.new()
	peer.create_server(8080)
	multiplayer.multiplayer_peer = peer
	joined()

func _on_join_pressed() -> void:
	var peer = ENetMultiplayerPeer.new()
	peer.create_client("127.0.0.1", 8080)
	multiplayer.multiplayer_peer = peer
	multiplayer.connect("connected_to_server", self.joined)
	rpc("recieve_message", "server", "Hosting")

func joined():
	host_button.visible = false
	join_button.visible = false
	username = username_edit.text
	rpc("recieve_message", "server", username + " joined the room")

func _on_send_pressed() -> void:
	rpc("recieve_message", username, message_edit.text)
	message_edit.text = ""

@rpc("any_peer", "call_local")
func recieve_message(_username, message):
	var color = "#00a4eb" #blue
	if _username == "server":
		color = "red" #red
	elif _username != username:
		color = "#00eba4" #green
	chat_area.text += "[color=" + color + "][" + _username + "]: " + message + "[/color]" + "\n"
