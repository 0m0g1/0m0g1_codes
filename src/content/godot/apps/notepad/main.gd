extends Control

@onready var text_edit = $VBoxContainer/TextEdit
var file_path : String = ""

func _on_open_pressed() -> void:
	$FileDialog.title = "Open a text"
	$FileDialog.file_mode = 0
	$FileDialog.connect("file_selected", self.open_text_file)
	$FileDialog.popup()

func open_text_file(path: String):
	file_path = path
	var file = FileAccess.open(path, FileAccess.READ)
	var text = file.get_as_text()
	text_edit.text = text
	file.close()

func save_text_file(path: String):
	var file = FileAccess.open(path, FileAccess.WRITE)
	file.store_string(text_edit.text)
	file.close()

func _on_save_pressed() -> void:
	if file_path == "":
		$FileDialog.title = "Save a text"
		$FileDialog.file_mode = 4
		$FileDialog.connect("file_selected", self.save_text_file)
		$FileDialog.popup()
	else:
		save_text_file(file_path)
