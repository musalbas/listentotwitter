from listentotwitter.data.emojidata import emojidata

def extract_emojis(text):
    emojis = []

    for character in text:
        codepoint_dec = ord(character)
        
        if codepoint_dec < 255: # TODO: find a higher value for this
            continue

        codepoint = format(codepoint_dec, 'x').upper()
        
        for emoji in emojidata:
            if codepoint == emoji['unified']:
                emojis.append(emoji)

    return emojis
