extends Control


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	$CenterContainer/OptionButton.add_item("kiwi")


func _on_option_button_item_selected(index: int) -> void:
	print("The selected item is index: " + str(index))
	print("The selected item's name is: " + $CenterContainer/OptionButton.text)
