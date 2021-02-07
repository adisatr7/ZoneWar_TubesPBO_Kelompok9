# Zone War: Text Strategy Game

```
                 ____           __      __        
   /\           |_  /___ _ _  __\ \    / /_ _ _ _            /\
  |  |           / // _ \ ' \/ -_) \/\/ / _` | '_|          |  |
 /----\         /___\___/_||_\___|\_/\_/\__,_|_|           /----\
[______]                Text Strategy Game                [______]
 |    |         _____                        _____         |    |
 |[]  |        [     ]                      [     ]        |  []|
 |    |       [_______][ ][ ][ ][][ ][ ][ ][_______]       |    |
 |    [ ][ ][ ]|     |  ,----------------,  |     |[ ][ ][ ]    |
 |             |     |/'    ____..____    '\|     |             |
  \  []        |     |    /'    ||    '\    |     |        []  /
   |      []   |     |   |o     ||     o|   |     |  []       |
   |           |  _  |   |     _||_     |   |  _  |           |
   |   []      | (_) |   |    (_||_)    |   | (_) |       []  |
   |           |     |   |     (||)     |   |     |           |
   |           |     |   |      ||      |   |     |           |
 /''           |     |   |o     ||     o|   |     |           ''\
[_____________[_______]--'------''------'--[_______]_____________]

```

## Pendahuluan

Selamat datang di page GitHub kami! Kami adalah kelompok 9, yang beranggotakan:

* Novian Dwi Romadon (19104011)  
* Satria Adi Nugraha (19104027)  
* Rifqi Alfinnur Charisma (19104031)  

Page ini adalah hasil kerjasama kelompok kami. Setelah hasil diskusi bersama kami memutuskan untuk membuat game berjudul Zone War: Text Strategy Game. Sesuai dengan judul game ini adalah game strategi yang berbasis text. Adapun video penjelasan tentang bagaimana cara kerja game ini dapat dilihat [disini](https://youtu.be/jXoSgrdUbFs). Jika ada gambar yang kurang jelas di video tersebut, anda dapat melihat versi HDnya [disini](https://github.com/raddox7/ZoneWar_TubesPBO_Kelompok9/tree/master/Documentation)

## Developer's Logs

#### Changelog (v1):

- Finalisasi game serta memastikan game benar-benar sudah dalam keadaan 'final'

#### Known Bugs:

Menemukan bug? Harap laporkan kepada kami segera!

#### To do:
- [x] ~~Buat Class Diagram~~
- [x] ~~Buat program dalam bahasa Javascript!~~
- [x] ~~Upload ke Github!~~
- [x] ~~Temukan bug sebanyak mungkin!~~
- [x] ~~Perbaiki bug-bug yang sudah ditemukan!~~
- [x] ~~Siapkan materi presentasi!~~
- [x] ~~Buat video presentasi!~~
- [x] ~~Upload video ke YouTube!~~
- [ ] Pastikan tidak ada unit yang overpowered!

## Cara Bermain
```
           /\                                                 /\
 _         )( ______________________   ______________________ )(         _
(_)///////(**)______________________> <______________________(**)\\\\\\\(_)
           )(                                                 )(
           \/             == PETUNJUK  BERMAIN ==             \/
```

1. Permainan terdiri dari 2 pemain yang masing-masing memiliki sebuah
   kastil. Kedua pemain diharuskan menjaga kastilnya masing-masing 
   sembari menghancurkan kastil milik lawan.
2. Permainan menggunakan sistem giliran. Setiap kali kedua pemain 
sudah menggunakan gilirannya, permainan akan lanjut ke ronde berikutnya.
3. Di awal permainan dilakukan yang namanya coin-flip untuk 
menentukan siapa yang bergerak duluan di setiap rondenya.
4. Setiap pemain masing-masing memiliki satu buah kastil yang wajib 
mereka jaga. Kastil ini memiliki 30 HP dan tidak dapat menyerang.
5. Di setiap ronde, masing-masing pemain memiliki credit dengan 
nilai maksimum 10 credits. Setiap ronde, masing-masing pemain 
mendapatkan credit sejumlah nomor ronde tersebut.
6. Pada gilirannya, masing-masing pemain dapat:
   - Menggunakan credit untuk membeli pasukan (lihat daftar pasukan 
   di bawah). Jika anda membeli pasukan, pasukan yang baru anda beli 
   baru bisa diberi perintah di ronde berikutnya.
   - Menggerakan pasukan yang ada di medan perang. Setiap pasukan 
   memiliki kekurangan dan kelebihan masing-masing. Beberapa di 
   antaranya juga memiliki skill dan cara bermainnya sendiri.

   Ketentuan:
   - Pasukan yang sudah diberi perintah tidak dapat diberi perintah 
   lagi hingga ronde berikutnya.
   - Anda diperbolehkan membeli pasukan DAN memberi perintah kepada 
   pasukan anda pada ronde/giliran yang sama. Yang menjadi pembatas 
   adalah apakah anda memiliki credit dan apakah anda memiliki 
   pasukan yang belum diberi perintah apapun di ronde tersebut.
   - Credit anda yang belum dipakai bisa anda pakai di ronde 
   selanjutnya.

7. Permainan berakhir jika kastil milik salah satu pemain hancur. 
   Pemain yang kastilnya hancur dinyatakan kalah dan pemain yang
   kastilnya masih berdiri dinyatakan sebagai pemenang.


## Unit list
```
   |\                     /)                                        |\                     /)
 /\_\\__               (_//                                       /\_\\__               (_//
|   `>\-`     _._       //`)                                     |   `>\-`     _._       //`)
 \ /` \\  _.-`:::`-._  //                                         \ /` \\  _.-`:::`-._  //
  `    \|`    :::    `|/    _   _       _ _     _     _     _      `    \|`    :::    `|/
        |     :::     |    | | | |     (_) |   | |   (_)   | |           |     :::     |
        |.....:::.....|    | | | |_ __  _| |_  | |    _ ___| |_ ___      |.....:::.....|
        |:::::::::::::|    | | | | '_ \| | __| | |   | / __| __/ __|     |:::::::::::::|
        |     :::     |    | |_| | | | | | |_  | |___| \__ \ |_\__ \     |     :::     |
        \     :::     /     \___/|_| |_|_|\__| \_____/_|___/\__|___/     \     :::     /
         \    :::    /     _________________________________________      \    :::    /        
          `-. ::: .-'                                                      `-. ::: .-'
           //`:::`\\                                                        //`:::`\\
          //   '   \\                                                      //   '   \\
         |/         \\                                                    |/         \\
```
#### Novice Adventurer
```
Dmg  : random(1,4)
HP   : 6
Cost : 1 credit
"Petualang cupu nan polos. Masih perlu banyak belajar mengenai 
pertempuran. Walau begitu, harganya yang murah memungkinkan unit 
ini untuk di-spam di medan pertempuran"
```

#### Saboteur
```
Dmg  : random(1,4)
HP   : 4
Cost : 2
"Seorang mata-mata yang dapat anda kirim untuk menyamar dan 
menyabotase kastil lawan. Dengan membeli unit ini, anda akan 
mengirimnya ke barisan lawan dan kontrol unit akan diberikan ke 
tim lawan. Sebagai gantinya, kastil lawan menerima damage sebesar 
random(1,7)"
```

#### Dwarven Builder
```
Dmg  : random(1,4)
HP   : 4
Cost : 5
"Seorang kurcaci dengan keahlian seputar bangun-membangun. Saat
anda membeli unit ini, ia akan secara otomatis memperbaiki kastil
anda sebesar random(1,4)"
```

#### Bomber
```
Dmg  : random(5,12)
HP   : 5
Cost : 3
"Seorang prajurit berani mati yang gagah berani. Unit ini menyerang 
dengan cara meledakkan bom yang diikat di tubuhnya. Bom hanya akan 
meledak jika ia menyerang, tetapi tidak jika ia mati karena dibunuh 
unit lain. Jika unit ini meledakkan bomnya, ia akan mati"
```

#### Nightblade Infiltrator
```
Dmg  : random(2,7) + random(2,7)
HP   : 3
Cost : 6
"Seorang pembunuh bayaran dari dunia bawah tanah dengan keahlian 
membunuh secara tersembunyi menggunakan dua belatinya. Unit ini 
tidak dapat diserang kecuali ia sudah pernah menyerang sebelumnya"
```

#### Berserker Warrior
```
Dmg  : 4 + random(0, missing_hp)
HP   : 9
Cost : 6
"Seorang ahli tombak yang berasal dari suku barbar. Memiliki tekad 
dan semangat bertarung yang sangat tinggi. Semakin unit ini 
terluka, semakin besar potensi damage yang ia berikan ke 
unit/kastil lawan"
```

#### Colovian Knight
```
Dmg  : random(2,5)
HP   : 13
Cost : 6
"Seorang ksatria yang bersumpah untuk melindungi orang-orang di 
sekitarnya. Selama unit ini ada di formasi unit anda, lawan anda 
tidak bisa menyerang unit lain hingga unit ini mati terlebih dahulu"
```

#### Voxblade Assassin
```
Dmg  : random(1,3) + random(1,3)
HP   : 5
Cost : 7
"Seorang pembunuh bayaran yang merupakan pengikut dan pemuja dewi 
kematian. Setiap kali unit ini melakukan kill terhadap unit lain, 
anda dapat memerintahkannya untuk menyerang lagi"
```

#### Vexanian Illusionist
```
Dmg  : random(3,6)
HP   : 11
Cost : 8
"Makhluk misterius yang berasal dari bawah laut. Dengan kemampuan
hipnotisnya, unit ini dapat membuat siapapun yang menyerangnya 
melukai diri sendiri. Unit lain yang menyerang unit ini akan 
menerima damage sebesar 50% dari total damage yang diterima unit 
ini. Jika hasil pembagian ternyata desimal, bulatkan ke bawah"
```

#### Vampire Battlelord
```
Dmg  : random(2,8)  
HP   : 8   
Cost : 8   
"Seorang penyihir yang mengorbankan jiwanya untuk ditawarkan ke 
iblis demi mendapatkan kekuatan kegelapan. Unit ini mampu 
memulihkan dirinya sebesar 50% HP dari total damage yang ia berikan 
saat ia menyerang unit lain. Jika hasil pembagian ternyata desimal, 
bulatkan ke bawah. Life steal tidak berlaku jika target adalah kastil
```

## Tertarik Ingin Memainkannya?
```
     _   _   _   _   _                             _   _   _   _   _
    | |_| |_| |_| |_| |                           | |_| |_| |_| |_| |
    |_________________|                           |_________________|
     \               /                             \               /
      |        .-.  |_   _   _   _   _   _   _   _  |  .-.        |
      |        | |  | |_| |_| |_| |_| |_| |_| |_| |_|  | |        |
      |        |_|  |                               |  |_|        |
      |             |    = PETUNJUK  INSTALASI =    |             |
      |           .-|_           _.---._           _|-.           |
      |           |   '-._   _.-'_|_|_|_'-._   _.-'   |           |
      | .-.       |       '.'_|_|_|_|_|_|_|_'.'       |      .-.  |
      | | |       |        ||_|_|_|_|_|_|_|_||        |      | |  |
      | |_|       |  [  [  ||_|_|_|_|_|_|_|_||==]==]==|      |_|  |
      |           |==[==[==||/ \|/ \|/ \|/ \||  ]  ]  |           |
      |           |        |                 |        |           |
      lc__________|  [  [  |                 |==]==]==|___________|
      ~"^"~"^"~^"~|________|                 |________|~"^"~"^"~^"~
```
Cukup run saja di compiler atau IDE apapun yang mendukung bahasa Javascript! Selain itu anda juga bisa pergi ke salah satu link berikut (Powered by Repl.it):

- Room 1: [Aestherian Forest](https://repl.it/@raddox7/ZoneWar-v1-Room-1)
- Room 2: [No Man's Land](https://repl.it/@raddox7/ZoneWar-v1-Room-2)
- Room 3: [Elven Ruins of Alvor](https://repl.it/@raddox7/ZoneWar-v1-Room-3)
- Room 4: [Frozen Northland](https://repl.it/@raddox7/ZoneWar-v1-Room-4)

Anda juga bisa mengajak teman Anda untuk pergi ke link room yang sama dan memainkan game ini secara **Multiplayer**! Oleh karena itu, jika ada orang lain yang sedang bermain **Singleplayer vs AI** ataupun orang lain yang sedang bermain dengan temannya, mohon dengan sangat untuk jangan diganggu.