extends Control

@onready var join_button = $VBoxContainer/HBoxContainer/join
@onready var host_button = $VBoxContainer/HBoxContainer/host
@onready var chat_area = $VBoxContainer/chat_area
@onready var message_edit = $VBoxContainer/HBoxContainer2/message_edit
@onready var send_button = $VBoxContainer/HBoxContainer2/send
@onready var username_edit = $VBoxContainer/HBoxContainer/username

var username = ""

func _on_host_pressed() -> void:
	var peer = ENetMultiplayerPeer.new()
	peer.create_server(8080)
	multiplayer.multiplayer_peer = peer
	chat_area.text += "Chat room created\n"
	joined()

func joined():
	host_button.visible = false
	join_button.visible = false
	username = username_edit.text
	rpc("recieve_message", "server", str(username, " joined the server"))

func _on_join_pressed() -> void:
	var peer = ENetMultiplayerPeer.new()
	peer.create_client("127.0.0.1", 8080)
	multiplayer.multiplayer_peer = peer
	multiplayer.connect("connected_to_server", self.joined)

func _on_send_pressed() -> void:
	rpc("recieve_message", username, message_edit.text)
	message_edit.text = ""

@rpc("any_peer", "call_local")
func recieve_message(sender_username, message):
	var color = ""
	if (sender_username == username):
		color = "#00a4eb"
	elif (sender_username == "server"):
		color = "red"
	else:
		color = "#00eba4"
	chat_area.text += str("[", sender_username, "]: ", "[color=", color, "]" , " ", message, "[/color]" ,"\n")
