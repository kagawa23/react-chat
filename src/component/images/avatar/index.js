const FILE_LIST=[ 
'boy.png',
'bull.png',
'chick.png',
'crab.png',
'girl.png',
'hedgehog.png',
'hippopotamus.png',
'koala.png',
'lemur.png',
'man.png',
'pig.png',
'tiger.png',
'whale.png',
'woman.png',
'zebra.png' ]

const avatarList = FILE_LIST
    .map(f=>({
        icon:require(`./${f}`),
        text:f.replace('.png','')
    }))

console.log(avatarList);

export default avatarList;