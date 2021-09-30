# zx-spectrum-screen-creator
Browser based ZX Spectrum screen designer

This project allows a user to create ZX Spectrum screen layouts for games or applications.

Screen

The screen area represents the Spectrum display and is surrounded by a narrow border that represents the Spectrum border. Above the screen, the character position of the mouse is displayed as X and Y coordinates along with that position's character, ink, paper, bright and flash attributes.
There are two control boxes, one for Character Grid and another for Border Marker, these switch the display of the optional guidelines on and off. If the control box is orange then the option is on, if it is white then the option is off.
Clicking on the screen will place the currently selected character into that position with the current bright, flash, paper and ink colours. If the paper and/or ink are set to none then the colours will not be set, just the pixel pattern from the character.
If the current character is None Selected then only the paper, ink, bright and flash attributes will be written.

Ink

This column controls the current ink colour, selecting the coloured square selects that colour and the orange arrow indicates the current selection. The colours 0 (black) to 7 (white) can be selected as well as a special None mode. When adding characters to the screen with none selected, the ink colour will not be written.

Paper

This column controls the current paper colour, selecting the coloured square selects that colour and the orange arrow indicates the current selection. The colours 0 (black) to 7 (white) can be selected as well a special mode, None. When adding characters to the screen with none selected, the paper colour, bright or flash will not be written.

Border

This column controls the current border colour, selecting the coloured square selects that colour and the orange arrow indicates the current selection. The colours 0 (black) to 7 (white) can be selected.

Attributes

There are two options in attributes, Bright and Flash. Characters will be set with these attributes when they are placed on the screen. If the paper is set to none then the flash and bright attributes will not be written. The show Flash option starts the flashing and it continues until either the button is clicked again or the mouse pointer leaves the Show Flash button.

Erase

When the erase Character option is set clicking on the screen will set all the pixels in that character position to paper. It will also set the paper and ink colours if they are not set to none.

Character Editor

Clicking on the Fetch button will load the currently selected character into the character editor, this can then be changed by clicking on the pixels. A click will toggle the pixel between ink and paper. Clicking on the Store button will put the character back in highlighted position in the character array and update the screen display where those characters are used. Characters can be fetched from any character position, they can be stored in all character positions except the block graphics, the last 16 characters.

Import CharSet

Import character set opens a file open dialog box, this allows a previously saved character set to be loaded. This will also update the characters on screen if they are that character.

Import Screen

Import screen opens a file open dialog box, this allows a previously saved screen to be loaded.

Export CharSet

Export character set saves the character set as a JSON file. The save behaviour will depend on your browser and browser settings. This allows a character set to be saved to the local computer.

Export Screen

Export screen saves the screen as a JSON file. The save behaviour will depend on your browser and browser settings. This allows a screen to be saved to the local computer.

Output CharSet

Output character set writes basic code to the output text area that will create the character set (including the UDGs) in a Spectrum environment. This code can be copied and pasted into a Spectrum emulator, BasIN for example, to enable the character set to be put into a Spectrum data format and subsequently used in your own programs.

Output UDGs

Output UDGs writes basic code to the output text area that will create the UDGs in a Spectrum environment. This code can be copied and pasted into a Spectrum emulator, BasIN for example, to enable the UDGs to be put into a Spectrum data format and subsequently used in your own programs.

Output Screen

Output screen writes basic code to the output text area that will create the screen in a spectrum environment. This code can be copied and pasted into a Spectrum emulator, BasIN for example, to enable the screen to be put into a Spectrum data format and subsequently used in your own programs.

Clear Screen

This button clears the screen to the current ink and paper colours with the current bright and flash attributes.

Clear Char+UDG

This button resets the character set and UDGs to the default character set.

Autosave

The screen, characters and some other settings are automatically saved as you work, when you open the application this saved state is automatically loaded. This is to offer some protection against accidental browser tab closing and should not be relied upon to save data, use the export functions regularly as you work.
