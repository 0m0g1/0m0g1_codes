extends Control

@onready var search_bar = $VBoxContainer/HBoxContainer/search_bar
@onready var search_button = $VBoxContainer/HBoxContainer/search_button
@onready var doc_display = $VBoxContainer/HBoxContainer2/doc_display
@onready var display = $VBoxContainer/HBoxContainer2/display


func _on_search_button_pressed() -> void:
	var url = search_bar.text
	$HTTPRequest.request(url)

func _on_http_request_request_completed(result: int, response_code: int, headers: PackedStringArray, body: PackedByteArray) -> void:
	var doc = body.get_string_from_utf8()
	doc_display.text = doc
