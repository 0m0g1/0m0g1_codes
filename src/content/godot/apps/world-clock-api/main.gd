extends Control

@onready var timezone_picker = $HBoxContainer/GridContainer/timezone
@onready var location_picker = $HBoxContainer/GridContainer/location
@onready var fetch_button = $HBoxContainer/GridContainer/fetch
@onready var display = $HBoxContainer/CenterContainer/display

func _ready() -> void:
	$HTTPRequest.connect("request_completed", self.set_time)


func set_time(result, response_code, headers, body : PackedByteArray):
	var json = JSON.parse_string(body.get_string_from_utf8())
	display.text = json["datetime"]


func _on_fetch_pressed() -> void:
	var url = "http://worldtimeapi.org/api/timezone/" + timezone_picker.text + "/" + location_picker.text
	$HTTPRequest.request(url)
