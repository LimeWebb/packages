let LimeEmojiss = {}

LimeEmojiss.repoApiUrl = 'https://api.github.com/repos/LimeWebb/emojis/contents/' 

LimeEmojiss.getEmojiSet = async function(emojiSet='lime1111') {
  try {
    const directories = await (await fetch(repoApiUrl)).json()
      .filter((file) => file.type === 'dir')
      .map((directory) => directory.name)
    
    if(Array.isArray(directories)) {
      const dir = directories.find((d) => d.name == emojiSet)
      if(!dir) return []
      const emojis = await (await fetch(dir)).json()
        .filter((emoji) => emoji.type === 'file')
        .map((emoji) => ({
          name: emoji.name.replace(/(\.png)$/, ''),
          url: emoji.download_url ?? null
        }))
      return emojis
    } else {
      return []
    }
  } catch(err) {
    console.error(err)
    return []
  }
}

LimeEmojiss.getEmojiByName = async function(name='lime1111_dizzy') {
  const split = name.split('_')
  const setName = split[0]
  const emojis = await LimeEmojiss.getEmojiSet(setName)
  const emoji = emojis.find((e) => e.name == split[1]).url
  return emoji ?? ''
}