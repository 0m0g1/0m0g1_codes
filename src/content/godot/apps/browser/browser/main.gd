extends Control

@onready var searchbar = $VBoxContainer/HBoxContainer/searchbar
@onready var searchbutton = $VBoxContainer/HBoxContainer/searchbutton
@onready var document_display = $"VBoxContainer/HBoxContainer2/document-display"
@onready var display = $VBoxContainer/HBoxContainer2/display

func _on_searchbutton_pressed() -> void:
	$HTTPRequest.request(searchbar.text)


func _on_http_request_request_completed(result: int, response_code: int, headers: PackedStringArray, body: PackedByteArray) -> void:
	var data = body.get_string_from_utf8()
	document_display.text = data
