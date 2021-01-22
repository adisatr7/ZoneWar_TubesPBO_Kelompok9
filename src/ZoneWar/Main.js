//======================================================================================================================
//  Zone War: Text Strategy Game - by Kelompok 9 (S1SE-03-A)
//----------------------------------------------------------------------------------------------------------------------
//  - Novian Dwi Romadon        (19104011)
//  - Satria Adi Nugraha        (19104027)
//  - Rifqi Alfinnur Charisma   (19104031)
//======================================================================================================================


//======================================================================================================================
// # CONFIGS
//----------------------------------------------------------------------------------------------------------------------
// Tempat mengatur beberapa konfigurasi permainan
//======================================================================================================================

const
    MAX_CREDITS = 10,       // Jumlah max credit yang dapat dimiliki masing-masing pemain
    MAX_CREDIT_GAIN = 8;    // Jumlah max pendapatan credit


//======================================================================================================================
// # STRINGS
//----------------------------------------------------------------------------------------------------------------------
// Berisi konstanta-konstanta string
//======================================================================================================================

const STRINGS = [
    TITLE = "                 ____           __      __        \n" +
        "   /\\           |_  /___ _ _  __\\ \\    / /_ _ _ _            /\\\n" +
        "  |  |           / // _ \\ ' \\/ -_) \\/\\/ / _` | '_|          |  |\n" +
        " /----\\         /___\\___/_||_\\___|\\_/\\_/\\__,_|_|           /----\\\n" +
        "[______]                Text Strategy Game                [______]\n" +
        " |    |         _____                        _____         |    |\n" +
        " |[]  |        [     ]                      [     ]        |  []|\n" +
        " |    |       [_______][ ][ ][ ][][ ][ ][ ][_______]       |    |\n" +
        " |    [ ][ ][ ]|     |  ,----------------,  |     |[ ][ ][ ]    |\n" +
        " |             |     |/'    ____..____    '\\|     |             |\n" +
        "  \\  []        |     |    /'    ||    '\\    |     |        []  /\n" +
        "   |      []   |     |   |o     ||     o|   |     |  []       |\n" +
        "   |           |  _  |   |     _||_     |   |  _  |           |\n" +
        "   |   []      | (_) |   |    (_||_)    |   | (_) |       []  |\n" +
        "   |           |     |   |     (||)     |   |     |           |\n" +
        "   |           |     |   |      ||      |   |     |           |\n" +
        " /''           |     |   |o     ||     o|   |     |           ''\\\n" +
        "[_____________[_______]--'------''------'--[_______]_____________]\n\n",

    GUIDE = "           /\\                                                 /\\\n" +
            " _         )( ______________________   ______________________ )(         _\n" +
            "(_)///////(**)______________________> <______________________(**)\\\\\\\\\\\\\\(_)\n" +
            "           )(                                                 )(\n" +
            "           \\/             == PETUNJUK  BERMAIN ==             \\/\n\n" +
            "1. Permainan terdiri dari 2 pemain yang masing-masing memiliki sebuah\n" +
            "   kastil. Kedua pemain diharuskan menjaga kastilnya masing-masing \n" +
            "   sembari menghancurkan kastil milik lawan.\n" +
            "2. Permainan menggunakan sistem giliran. Setiap kali kedua pemain \n" +
            "sudah menggunakan gilirannya, permainan akan lanjut ke ronde berikutnya.\n" +
            "3. Di awal permainan dilakukan yang namanya coin-flip untuk \n" +
            "menentukan siapa yang bergerak duluan di setiap rondenya.\n" +
            "5. Setiap pemain masing-masing memiliki satu buah kastil yang wajib \n" +
            "mereka jaga. Kastil ini memiliki 30 HP dan tidak dapat menyerang.\n" +
            "6. Di setiap ronde, masing-masing pemain memiliki credit dengan \n" +
            "nilai maksimum 10 credits. Setiap ronde, masing-masing pemain \n" +
            "mendapatkan credit sejumlah nomor ronde tersebut.\n" +
            "7. Pada gilirannya, masing-masing pemain dapat:\n" +
            "   - Menggunakan credit untuk membeli pasukan. Jika anda membeli \n" +
            "   pasukan, pasukan yang baru anda beli baru bisa diberi perintah \n" +
            "   di ronde berikutnya.\n" +
            "   - Menggerakan pasukan yang ada di medan perang. Setiap pasukan \n" +
            "   memiliki kekurangan dan kelebihan masing-masing. Beberapa di \n" +
            "   antaranya juga memiliki skill dan cara bermainnya sendiri.\n\n" +
            "   Ketentuan:\n" +
            "   - Pasukan yang sudah diberi perintah tidak dapat diberi perintah \n" +
            "   lagi hingga ronde berikutnya.\n" +
            "   - Anda diperbolehkan membeli pasukan DAN memberi perintah kepada \n" +
            "   pasukan anda pada ronde/giliran yang sama. Yang menjadi pembatas \n" +
            "   adalah apakah anda memiliki credit dan apakah anda memiliki \n" +
            "   pasukan yang belum diberi perintah apapun di ronde tersebut.\n" +
            "   - Credit anda yang belum dipakai bisa anda pakai di ronde \n" +
            "   selanjutnya.\n\n" +
            "8. Permainan berakhir jika kastil milik salah satu pemain hancur. \n" +
            "   Pemain yang kastilnya hancur dinyatakan kalah dan pemain yang\n" +
            "   kastilnya masih berdiri dinyatakan sebagai pemenang.\n"
];


//======================================================================================================================
// # CLASSES
//======================================================================================================================

//======================================================================================================================
// > Class: Player
//----------------------------------------------------------------------------------------------------------------------
// Class yang berisikan tentang hal-hal yang berhubungan dengan player game ini
//======================================================================================================================

class Player {

    constructor(p_name) {
        this.p_name = p_name;
        this.formation = [new Castle(this)];
        this.credit = 0;

        this.credits_earned = 0;
        this.credits_spent = 0;
        this.units_bought = 0;
        this.damage_dealt = 0;
    }

    //------------------------------------------------------------------------------------------------------------------
    // > Method: Get Castle HP
    //------------------------------------------------------------------------------------------------------------------
    // Mereturn HP kastil milik pemain ini
    //------------------------------------------------------------------------------------------------------------------

    get_castle_hp = function() {
        return this.formation[0].hp;
    };

    //------------------------------------------------------------------------------------------------------------------
    // > Method: Set Enemy
    //------------------------------------------------------------------------------------------------------------------
    // Mengatur siapa lawan dari pemain ini. Nantinya berguna saat sedang bertempur
    //------------------------------------------------------------------------------------------------------------------

    set_enemy(enemy) {
        this.enemy = enemy;
    };

    //------------------------------------------------------------------------------------------------------------------
    // > Method: Show Unit Formation
    //------------------------------------------------------------------------------------------------------------------
    // Menampilkan seluruh unit TERMASUK kastil milik pemain ini
    //------------------------------------------------------------------------------------------------------------------

    show_unit_formation() {
        console.log(`Formasi unit ${this.p_name}:`);
        for(let unit of this.formation)
            console.log(`- ${unit.status()}`);
        console.log();
    };

    //------------------------------------------------------------------------------------------------------------------
    // > Method: Has Movable Unit?
    //------------------------------------------------------------------------------------------------------------------
    // Mengecek apakah pemain ini memiliki unit yang dapat diberi perintah
    //------------------------------------------------------------------------------------------------------------------

    has_movable_unit() {
        for(let i=1; i<this.formation.length; i++) {
            if(this.formation[i] !== undefined) {
                if(!this.formation[i].has_moved && this.formation[i].hp > 0)
                    return true;
            }
        }
        return false;
    };

    //------------------------------------------------------------------------------------------------------------------
    // > Method: Has Colovian?
    //------------------------------------------------------------------------------------------------------------------
    // Mengecek apakah pemain ini memiliki setidaknya satu Colovian Knight
    //------------------------------------------------------------------------------------------------------------------

    has_colovian() {
        for(let unit of this.formation) {
            if(unit.hasOwnProperty('is_colovian') && unit.hp > 0)
                return true;
        }
        return false;
    };

    //------------------------------------------------------------------------------------------------------------------
    // > Method: Buy Unit
    //------------------------------------------------------------------------------------------------------------------
    // Untuk memroses pembelian unit
    //------------------------------------------------------------------------------------------------------------------

    buy_unit(new_unit) {
        if(new_unit.hasOwnProperty('sabotage'))
            this.enemy.formation.push(new_unit);
        else
            this.formation.push(new_unit);

        this.credit -= new_unit.cost;
        console.log(`${this.p_name} membeli unit ${new_unit.name}!`);

        this.credits_spent += new_unit.cost;
        this.units_bought++;
    };

    //------------------------------------------------------------------------------------------------------------------
    // > Method: Get Attackable Units
    //------------------------------------------------------------------------------------------------------------------
    // Mereturn array berisi objek unit-unit yang dapat diserang
    //------------------------------------------------------------------------------------------------------------------

    get_attackable_units() {
        const attackable_units = [];
        const units = this.formation;

        //--------------------------------------------------------------------------------------------------------------
        // Jika pemain ini memiliki setidaknya satu Colovian Knight, masukan HANYA unit-unit tipe ini saja
        //--------------------------------------------------------------------------------------------------------------

        if(this.has_colovian()) {
            for(let unit of units) {
                if(unit.hasOwnProperty('is_colovian')) {
                    if(unit.hp > 0)
                        attackable_units.push(unit);
                }

            }
        }

        //--------------------------------------------------------------------------------------------------------------
        // Jika pemain ini tidak memiliki Colovian Knight, masukan semua unit-unit pemain ini yang tidak dalam kondisi
        // stealth atau sembunyi
        //--------------------------------------------------------------------------------------------------------------

        else {
            for(let unit of units) {
                if(unit.hp > 0) {

                    //--------------------------------------------------------------------------------------------------
                    // Jika unit dapat bersembunyi, ia harus terlebih dahulu dalam mode TIDAK bersembunyi
                    //--------------------------------------------------------------------------------------------------
                    if(unit.hasOwnProperty('is_stealthed')) {
                        if(!unit.is_stealthed)
                            attackable_units.push(unit)
                    }

                    //--------------------------------------------------------------------------------------------------
                    // Jika unit adalah unit normal
                    //--------------------------------------------------------------------------------------------------
                    else {
                        attackable_units.push(unit)
                    }

                }
            }
        }
        return attackable_units;
    };

    //------------------------------------------------------------------------------------------------------------------
    // > Method: Get Movable Units
    //------------------------------------------------------------------------------------------------------------------
    // Mereturn array berisi unit-unit yang bisa diberi perintah saat method ini dijalankan
    //------------------------------------------------------------------------------------------------------------------

    get_movable_units = function() {
        const movable_units = [];
        const units = this.formation;

        for(let unit of units) {
            if(!unit.has_moved && unit.hp > 0 && !unit.is_castle)
                movable_units.push(unit);
        }
        return movable_units;
    }
}


//======================================================================================================================
// > Class: Unit
//----------------------------------------------------------------------------------------------------------------------
// Class parent semua objek 'unit' yang dapat dimiliki oleh pemain saat permainan berlangsung
//======================================================================================================================

class Unit {

    constructor(owner, name, dmg_min, dmg_max, max_hp, cost, desc) {
        this.owner = owner;             // Nama pemilik unit
        this.name = name;               // Nama unit
        this.dmg_min = dmg_min;         // Damage minimal
        this.dmg_max = dmg_max;         // Damage maksimal
        this.max_hp = max_hp;           // HP maksimal
        this.hp = this.max_hp;          // Jumlah HP saat ini
        this.cost = cost;               // Harga unit (satuan: credit)
        this.desc = desc;               // Deskripsi unit
        this.has_moved = true;          // Bernilai true jika sudah bergerak
    }

    //------------------------------------------------------------------------------------------------------------------
    // > Method: Deal Damage
    //------------------------------------------------------------------------------------------------------------------
    // Method mengaplikasikan damage ke unit lawan
    //------------------------------------------------------------------------------------------------------------------

    deal_damage(target) {
        let dmg = random(this.dmg_min, this.dmg_max);
        target.hp -= dmg;
        console.log(`${this.name} menyerang ${target.name} untuk ${dmg} poin damage!`);

        this.owner.damage_dealt += dmg;

        this.vexanian_check(target, dmg);    // Jika target adalah Vexanian Illusionist, penyerang mendapat damage
    };

    //------------------------------------------------------------------------------------------------------------------
    // > Method: Vexanian Check
    //------------------------------------------------------------------------------------------------------------------
    // Mengaplikasikan damage reflection jika unit ini menyerang Vexanian Illusionist
    //------------------------------------------------------------------------------------------------------------------

    vexanian_check(target, dmg) {
        if(target.hasOwnProperty('dmg_return_mod')) {
            dmg = Math.floor(dmg * target.dmg_return_mod);
            this.hp -= dmg;
            console.log(
                `${this.name} menusuk dirinya sendiri dan menerima ${dmg} poin damage!`
            )
        }
    };

    //------------------------------------------------------------------------------------------------------------------
    // > Method: Attack
    //------------------------------------------------------------------------------------------------------------------
    // Setiap unit dapat diperintahkan untuk menyerang unit lawan
    //------------------------------------------------------------------------------------------------------------------

    attack(target) {

        //--------------------------------------------------------------------------------------------------------------
        // Jika unit sudah pernah menyerang sebelumnya, unit tidak boleh menyerang lagi hingga ronde berikutnya
        //--------------------------------------------------------------------------------------------------------------

        if(!this.has_moved) {
            this.deal_damage(target);           // Kalkulasi damage + aksi penyerangan


            //----------------------------------------------------------------------------------------------------------
            // Jika unit berhasil menurunkan HP terget ke 0
            //----------------------------------------------------------------------------------------------------------
            if(target.hp <= 0 && !target.is_castle) {
                console.log(get_kill_quote(this, target));
            }

            //----------------------------------------------------------------------------------------------------------
            // Nyatakan bahwa unit telah bergerak pada ronde tersebut
            //----------------------------------------------------------------------------------------------------------
            this.has_moved = true;

        }
        else {
            console.log(`Error: Unit sudah bergerak di ronde ini! Tunggu hingga ronde berikutnya!!`)
        }
    };

    //------------------------------------------------------------------------------------------------------------------
    // > Method: Status
    //------------------------------------------------------------------------------------------------------------------
    // Menampilkan nama unit dan jumlah HP tersisa. Digunakan nantinya saat permainan berlangsung
    //------------------------------------------------------------------------------------------------------------------

    status() {

        //--------------------------------------------------------------------------------------------------------------
        // Menampilkan nama unit dan HP tersisa
        //--------------------------------------------------------------------------------------------------------------
        // -> Nightblade Infiltrator (3/3)
        //--------------------------------------------------------------------------------------------------------------
        let info = `${this.name} (${this.hp}/${this.max_hp} HP)`;

        //--------------------------------------------------------------------------------------------------------------
        // Menampilkan status apakah unit sedang kondisi stealth/tersembunyi
        //--------------------------------------------------------------------------------------------------------------
        // -> Nightblade Infiltrator (3/3) (Stealth)
        //--------------------------------------------------------------------------------------------------------------
        if(this.hasOwnProperty('is_stealthed')) {
            if(this.is_stealthed)
                info += ' (Stealth)';
        }

        //--------------------------------------------------------------------------------------------------------------
        // Menambahkan keterangan (Dead) jika unit sudah mati
        //--------------------------------------------------------------------------------------------------------------
        // -> Nightblade Infiltrator (0/3) (Dead)
        //--------------------------------------------------------------------------------------------------------------
        if(this.hp <= 0)
            info += ' (Dead)';

        //--------------------------------------------------------------------------------------------------------------
        // Menambahkan keterangan jika unit sudah bergerak di ronde tersebut
        //--------------------------------------------------------------------------------------------------------------
        // -> Contoh output: Nightblade Infiltrator (3/3) (Zzz)
        //--------------------------------------------------------------------------------------------------------------
        if(this.has_moved)
            info += ' (Zzz)';

        return info;
    };

    //------------------------------------------------------------------------------------------------------------------
    // > Method: Get Profile
    //------------------------------------------------------------------------------------------------------------------
    // Mengambil profile unit (nama, max HP, harga, dan desc)
    //------------------------------------------------------------------------------------------------------------------

    get_profile() {
        return `${this.name}\n` +
               `\t- Damage : random(${this.dmg_min},${this.dmg_max})\n` +
               `\t- Max HP : ${this.max_hp}\n` +
               `\t- Cost   : ${this.cost} credit(s)\n` +
               `\t\"${this.desc}\"\n`;
    };
}


//======================================================================================================================
// > Sub-class: Castle
//======================================================================================================================

class Castle extends Unit {
    constructor(owner) {
        super(owner, "Castle Fortress",
            undefined, undefined,
            30,
            undefined,

            `Kastil megah tempat anda memimpin unit-unit anda. Anda dinyatakan\n` +
            `\tkalah jika kastil anda berhasil dihancurkan`);

        this.is_castle = true;
        this.has_moved = undefined;
    }
}


//======================================================================================================================
// > Sub-class: Novice Adventurer
//======================================================================================================================

class NoviceAdventurer extends Unit {

    constructor(owner) {
        super(owner,
            "Novice Adventurer",
            1, 4,
            6,
            1,

            `Petualang cupu nan polos. Masih perlu banyak belajar mengenai\n` +
            `\tpertempuran. Walau begitu, harganya yang murah memungkinkan unit\n` +
            `\tini untuk di-spam di medan pertempuran`)
    }
}


//======================================================================================================================
// > Sub-class: Saboteur
//======================================================================================================================

class Saboteur extends Unit {

    constructor(owner) {
        const sabotage_min = 1;
        const sabotage_max = 7;

        super(owner,
            "Saboteur",
            1, 4,
            4,
            2,

            `Seorang mata-mata yang dapat anda kirim untuk menyamar dan\n` +
            `\tmenyabotase kastil lawan. Dengan membeli unit ini, anda akan\n` +
            `\tmengirimnya ke barisan lawan dan kontrol unit akan diberikan ke tim\n` +
            `\tlawan. Sebagai gantinya, kastil lawan menerima damage sebesar\n` +
            `\trandom(${sabotage_min},${sabotage_max})`);

        this.sabotage_min = sabotage_min;
        this.sabotage_max = sabotage_max;
        this.has_moved = false;
    }



    //------------------------------------------------------------------------------------------------------------------
    // Unit ini secara otomatis melakukan sabotase kastil lawan saat dibeli oleh pemain
    //------------------------------------------------------------------------------------------------------------------
    sabotage = function() {
        const sabotage_dmg = random(this.sabotage_min, this.sabotage_max);
        this.owner.formation[0].hp -= sabotage_dmg;
        console.log(`Kastil ${this.owner.p_name} mengalami kerusakan sebesar ${sabotage_dmg} damage!`);
    }

}


//======================================================================================================================
// > Sub-class: Builder
//======================================================================================================================

class Builder extends Unit {

    constructor(owner) {
        const
            repair_min = 1,
            repair_max = 3;

        super(
            owner,
            "Dwarven Builder",
            1, 4,
            4,
            5,

            `Seorang kurcaci dengan keahlian seputar bangun-membangun. Saat\n` +
            `\tanda membeli unit ini, ia akan secara otomatis memperbaiki kastil\n` +
            `\tanda sebesar random(${repair_min},${repair_max})`);

        this.repair_min = repair_min;
        this.repair_max = repair_max;
    }

    //------------------------------------------------------------------------------------------------------------------
    // > Passive Ability: Repair
    //------------------------------------------------------------------------------------------------------------------
    // Memperbaiki kastil pemilik unit ini saat pemain membelinya
    //------------------------------------------------------------------------------------------------------------------

    repair() {
        const repair_amount = random(this.repair_min, this.repair_max);
        this.owner.formation[0].hp += repair_amount;

        if(this.owner.formation[0].hp > 30)
            this.owner.formation[0].hp = 30;

        console.log(`${this.name} ${this.owner.p_name} telah memulihkan HP kastil sebesar ${repair_amount} poin!`);
    }
}


//======================================================================================================================
// > Sub-class: Bomber
//======================================================================================================================

class Bomber extends Unit {

    constructor(owner) {
        super(
            owner,
            "Bomber",
            5, 12,
            5,
            3,

            `Seorang prajurit berani mati yang gagah berani. Unit ini menyerang\n` +
            `\tdengan cara meledakkan bom yang diikat di tubuhnya. Bom hanya akan\n` +
            `\tmeledak jika ia menyerang, tetapi tidak jika ia mati karena dibunuh\n` +
            `\tunit lain. Jika unit ini meledakkan bomnya, ia akan mati`
        )
    }

    //------------------------------------------------------------------------------------------------------------------
    // > Override Method: deal_damage(target)
    //------------------------------------------------------------------------------------------------------------------
    // Unit ini akan mati saat ia melakukan penyerangan
    //------------------------------------------------------------------------------------------------------------------

    deal_damage(target) {

        //--------------------------------------------------------------------------------------------------------------
        // Kalkulasi random damage
        //--------------------------------------------------------------------------------------------------------------
        const dmg = random(this.dmg_min, this.dmg_max);
        console.log(
            `${this.name} ${this.owner.p_name} meledakkan dirinya di dekat ${target.name}\n` +
            `dan memberikan ${dmg} damage!`
        );
        target.hp -= dmg;

        this.owner.damage_dealt += dmg;

        //--------------------------------------------------------------------------------------------------------------
        // Bunuh unit ini
        //--------------------------------------------------------------------------------------------------------------

        this.hp = 0;
    };
}


//======================================================================================================================
// > Sub-class: Nightblade Infiltrator
//======================================================================================================================

class Nightblade extends Unit {

    constructor(owner) {
        super(
            owner,
            "Nightblade Infiltrator",
            2, 7,
            3,
            6,

            `Seorang pembunuh bayaran dari dunia bawah tanah dengan keahlian\n` +
            `\tmembunuh secara tersembunyi menggunakan dua belatinya. Unit ini\n` +
            `\ttidak dapat diserang kecuali ia sudah pernah menyerang sebelumnya`
        );

        //--------------------------------------------------------------------------------------------------------------
        // > Attribute: Is Stealthed?
        //--------------------------------------------------------------------------------------------------------------
        // Story-wise, unit ini adalah unit ahli bersembunyi dan menyamar. Gemeplay-wise, selama unit ini belum pernah
        // menyerang, lawan tidak dapat menyerang unit ini karena keberadaannya tidak diketahui.
        //--------------------------------------------------------------------------------------------------------------

        this.is_stealthed = true;
    }

    //------------------------------------------------------------------------------------------------------------------
    // > Override Method: Deal Damage
    //------------------------------------------------------------------------------------------------------------------
    // Unit ini menggunakan dual dagger dan memiliki sistem stealth yang unik
    //------------------------------------------------------------------------------------------------------------------

    deal_damage(target) {

        //----------------------------------------------------------------------------------------------------------
        // Kalkulasi random damage dan aksi penyerangan
        //----------------------------------------------------------------------------------------------------------

        let dmg1 = random(this.dmg_min, this.dmg_max);
        let dmg2 = random(this.dmg_min, this.dmg_max);
        let dmg_total = dmg1 + dmg2;
        target.hp -= dmg_total;
        console.log(`${this.name} menyerang ${target.name} untuk ${dmg1} + ${dmg2} (${dmg1 + dmg2}) poin damage!`);

        this.owner.damage_dealt += dmg_total;

        this.vexanian_check(target, dmg_total);

        //----------------------------------------------------------------------------------------------------------
        // Nyatakan bahwa unit tak lagi tersembunyi dan dapat diserang oleh lawan
        //----------------------------------------------------------------------------------------------------------

        if(this.is_stealthed) {
            this.is_stealthed = false;
            console.log(`${this.name} ${this.owner.p_name} tidak lagi tersembunyi!`);
        }

    };

    //------------------------------------------------------------------------------------------------------------------
    // > Override Method: Get Profile
    //------------------------------------------------------------------------------------------------------------------
    // Unit ini memiliki attack formula yang berbeda karena ia dilengkapi dengan dua buah belati
    //------------------------------------------------------------------------------------------------------------------

    get_profile() {
        return `${this.name}\n` +
               `\t- Damage : random(${this.dmg_min},${this.dmg_max}) + random(${this.dmg_min},${this.dmg_max})\n` +
               `\t- Max HP : ${this.max_hp}\n` +
               `\t- Cost   : ${this.cost} credit(s)\n` +
               `\t\"${this.desc}\"\n`;
    };
}


//======================================================================================================================
// > Sub-class: Berserker Warrior
//======================================================================================================================

class Berserker extends Unit {

    constructor(owner) {
        super(
            owner,
            "Berserker Warrior",
            4, undefined,
            9,
            6,

            `Seorang ahli tombak yang berasal dari suku barbar. Memiliki tekad\n` +
            `\tdan semangat bertarung yang sangat tinggi. Semakin unit ini\n` +
            `\tterluka, semakin besar potensi damage yang ia berikan ke\n` +
            `\tunit/kastil lawan`
        );
    }

    //------------------------------------------------------------------------------------------------------------------
    // > Override Method: Deal Damage
    //------------------------------------------------------------------------------------------------------------------
    // Damage unit ini berubah tergantung jumlah HP yang dimiliki saat unit ini melakukan serangan
    //------------------------------------------------------------------------------------------------------------------

    deal_damage(target) {
        const missing_hp = this.max_hp - this.hp;
        let dmg = this.dmg_min + random(0, missing_hp);

        target.hp -= dmg;
        console.log(`${this.name} menyerang ${target.name} dengan ${dmg} poin damage!`);

        this.vexanian_check(target, dmg);

        this.owner.damage_dealt += dmg;
    };

    //------------------------------------------------------------------------------------------------------------------
    // > Override Method: Get Profile
    //------------------------------------------------------------------------------------------------------------------
    // Unit ini memiliki damage calculation berbeda dari unit lain
    //------------------------------------------------------------------------------------------------------------------

    get_profile() {
        return `${this.name}\n` +
               `\t- Damage : ${this.dmg_min} + random(0, missing_hp)\n` +
               `\t- Max HP : ${this.max_hp}\n` +
               `\t- Cost   : ${this.cost} credit(s)\n` +
               `\t\"${this.desc}\"\n`;
    };
}


//======================================================================================================================
// > Sub-class: Colovian Knight
//======================================================================================================================

class ColovianKnight extends Unit {

    constructor(owner) {
        super(
            owner,
            "Colovian Knight",
            2, 5,
            13,
            6,

            `Seorang ksatria yang bersumpah untuk melindungi orang-orang di\n` +
            `\tsekitarnya. Selama unit ini ada di formasi unit anda, lawan anda\n` +
            `\ttidak bisa menyerang unit lain hingga unit ini mati terlebih dahulu`
        );

        this.is_colovian = true;
    }
}


//======================================================================================================================
// > Sub-class: Voxblade Assassin
//======================================================================================================================

class Voxblade extends Unit {

    constructor(owner) {
        super(
            owner,
            "Voxblade Assassin",
            1, 3,
            5,
            7,

            `Seorang pembunuh bayaran yang merupakan pengikut dan pemuja dewi\n` +
            `\tkematian. Setiap kali unit ini melakukan kill terhadap unit lain,\n` +
            `\tanda dapat memerintahkannya untuk menyerang lagi`
        );
    }

    //------------------------------------------------------------------------------------------------------------------
    // > Override Method: Attack
    //------------------------------------------------------------------------------------------------------------------
    // Unit tipe ini memiliki keahlian yakni ia dapat diperintahkan untuk bergerak lagi di ronde yang sama apabila
    // ia berhasil melakukan kill
    //------------------------------------------------------------------------------------------------------------------

    attack(target) {

        //--------------------------------------------------------------------------------------------------------------
        // Jika unit gagal melakukan kill atau baru saja dibeli pemain, unit ini tidak dapat menyerang
        //--------------------------------------------------------------------------------------------------------------

        if(!this.has_moved) {

            //----------------------------------------------------------------------------------------------------------
            // Kalkulasi random damage dan aksi penyerangan
            //----------------------------------------------------------------------------------------------------------
            const
                dmg1 = random(this.dmg_min, this.dmg_max),
                dmg2 = random(this.dmg_min, this.dmg_max),
                total_dmg = dmg1 + dmg2;

            target.hp -= total_dmg;
            console.log(
                `${this.name} ${this.owner.p_name} menyerang ${target.name} untuk ${dmg1} + ${dmg2} (${total_dmg}) `+
                `poin damage!`
            );

            //----------------------------------------------------------------------------------------------------------
            // Jika unit yang diserang adalah Vexanian Illusionist
            //----------------------------------------------------------------------------------------------------------
            this.vexanian_check(target, total_dmg);

            //----------------------------------------------------------------------------------------------------------
            // Jika unit berhasil menurunkan HP terget ke 0
            //----------------------------------------------------------------------------------------------------------
            if(target.hp <= 0 && !target.is_castle) {

                console.log(get_kill_quote(this, target));

                console.log(`${this.name} dapat bergerak lagi!`);
                this.has_moved = false;
            }

            //----------------------------------------------------------------------------------------------------------
            // Jika target tidak mati saat unit ini menyerangnya, unit ini tidak bisa bergerak lagi hingga ronde
            // berikutnya
            //----------------------------------------------------------------------------------------------------------
            else
                this.has_moved = true;

        }
        else {
            console.log(`Error: Unit sudah bergerak di ronde ini! Tunggu hingga ronde berikutnya!!`);

        }
    };

    //------------------------------------------------------------------------------------------------------------------
    // > Override Method: Get Profile
    //------------------------------------------------------------------------------------------------------------------
    // Unit ini memiliki attack formula yang berbeda karena ia dilengkapi dengan dua buah belati
    //------------------------------------------------------------------------------------------------------------------

    get_profile() {
        return `${this.name}\n` +
               `\t- Damage : random(${this.dmg_min},${this.dmg_max}) + random(${this.dmg_min},${this.dmg_max})\n` +
               `\t- Max HP : ${this.max_hp}\n` +
               `\t- Cost   : ${this.cost} credit(s)\n` +
               `\t\"${this.desc}\"\n`;
    };
}


//======================================================================================================================
// > Sub-class: Vexanian Illusionist
//======================================================================================================================

class Vexanian extends Unit {

    constructor(owner) {
        const dmg_return_mod = 1/2;

        super(
            owner,
            "Vexanian Illusionist",
            3, 6,
            11,
            8,

            `Makhluk misterius yang berasal dari bawah laut. Dengan kemampuan\n` +
            `\thipnotisnya, unit ini dapat membuat siapapun yang menyerangnya\n` +
            `\tmelukai diri sendiri. Unit lain yang menyerang unit ini akan\n` +
            `\tmenerima damage sebesar ${String(dmg_return_mod)} dari total damage yang diterima unit\n` +
            `\tini. Jika hasil pembagian ternyata desimal, bulatkan ke bawah`
        );

        //--------------------------------------------------------------------------------------------------------------
        // > Attribute: Damage Return Modifier
        //--------------------------------------------------------------------------------------------------------------
        // Siapapun yang menyerang unit ini akan menerima damage sebesar modifier berikut
        //--------------------------------------------------------------------------------------------------------------

        this.dmg_return_mod = dmg_return_mod;
    }
}


//======================================================================================================================
// > Sub-class: Vampire Battlelord
//======================================================================================================================

class VampireBattlelord extends Unit {

    constructor(owner) {
        const lifesteal_mod = 1/2;

        super(
            owner,
            "Vampire Battlelord",           // Nama unit
            2, 8,                           // Damage minimal, maksimal
            8,                              // Max HP
            8,                              // Harga

            `Seorang penyihir yang mengorbankan jiwanya untuk ditawarkan ke\n` +
            `\tiblis demi mendapatkan kekuatan kegelapan. Unit ini mampu\n` +
            `\tmemulihkan dirinya sebesar ${String(lifesteal_mod)} HP dari total damage yang ia berikan\n` +
            `\tsaat ia menyerang unit lain. Jika hasil pembagian ternyata desimal,\n` +
            `\tbulatkan ke bawah. Life steal tidak berlaku jika target adalah kastil!`
        );

        //--------------------------------------------------------------------------------------------------------------
        // > Attribute: Life Steal Modifier
        //--------------------------------------------------------------------------------------------------------------
        // Unit ini mencuri HP dari target yang diserangnya sebesar modifier berikut
        //--------------------------------------------------------------------------------------------------------------

        this.lifesteal_mod = lifesteal_mod;
    }

    //------------------------------------------------------------------------------------------------------------------
    // > Override Method: Deal Damage
    //------------------------------------------------------------------------------------------------------------------
    // Unit ini melakukan heal pada diri sendiri setiap kali ia menyerang unit lain
    //------------------------------------------------------------------------------------------------------------------

    deal_damage(target) {

        //--------------------------------------------------------------------------------------------------------------
        // Kalkulasi random damage dan aksi penyerangan
        //--------------------------------------------------------------------------------------------------------------

        const dmg = random(this.dmg_min, this.dmg_max);
        target.hp -= dmg;
        console.log(`${this.name} menyerang ${target.name} untuk ${dmg} poin damage!`);

        this.owner.damage_dealt += dmg;

        //--------------------------------------------------------------------------------------------------------------
        // Ability: Life steal (Tidak berlaku pada castle!)
        //--------------------------------------------------------------------------------------------------------------

        if(!target.is_castle) {
            const heal = Math.floor(dmg * this.lifesteal_mod);
            this.hp += heal;
            console.log(
                `${this.name} menyerap ${heal} HP!`
            )
        }

        this.vexanian_check(target, dmg);
    };
}


//======================================================================================================================
// # UTILITIES
//======================================================================================================================

//======================================================================================================================
// > Prototype Function: Remove Array Element by Value
//----------------------------------------------------------------------------------------------------------------------
// Menghapus elemen array tertentu
//======================================================================================================================

Array.prototype.remove = function() {
    let what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};


//======================================================================================================================
// > Prototype Function: Minimum Array Element
//----------------------------------------------------------------------------------------------------------------------
// Mencari nilai terkecil dalam sebuah array
//======================================================================================================================

Array.min = function( array ){
    return Math.min.apply( Math, array );
};


//======================================================================================================================
// > Function: Press Any Key
//----------------------------------------------------------------------------------------------------------------------
// Meminta user untuk menekan sembarang tombol terlebih dahulu sebelum melanjutkan
//======================================================================================================================

function press_enter_to_continue() {
    const enter = require('prompt-sync')();
    enter(`Tekan [ENTER] untuk melanjutkan...`);
}


//======================================================================================================================
// > Function: Random
//----------------------------------------------------------------------------------------------------------------------
// Mendapatkan nilai random dengan nilai minimum dan maximum yang ditentukan (inclusive!)
//======================================================================================================================

function random(min, max) {
    return Math.floor(Math.random() * ((max+1) - min) + min);
}


//======================================================================================================================
// > Function: Input Number
//----------------------------------------------------------------------------------------------------------------------
// Mendapatkan input dari pemain (akan loop jika yang diinputkan BUKAN angka)
//======================================================================================================================

function input_number(prompt) {
    const get_input = require('prompt-sync')();

    while(true) {
        let input;
        input = get_input(prompt);
        console.log();

        if(Number.isFinite(Number(input)))
            return Number(input);
        else
            console.log('Error: Mohon hanya masukan angka saja!\n');
    }
}


//======================================================================================================================
// > Function: Get Kill Quote
//----------------------------------------------------------------------------------------------------------------------
// Mendapatkan quote-quote badass saat seseorang melakukan kill!
//======================================================================================================================

function get_kill_quote(attacker, victim) {
    const
        QUOTE_LIST = [
            `${victim.name} tewas terbunuh!`,
            `${attacker.name} membunuh ${victim.name}!`,
            `Tubuh ${victim.name} hancur!`,
            `${victim.name} menghembuskan nafas terakhirnya!`,
            `${attacker.name} menewaskan ${victim.name}!`,
            `Tubuh ${victim.name} berdarah-darah, tak lama kemudian jatuh ke tanah!`,
            `Tubuh ${victim.name} rusak!`,
            `Urat nadi ${victim.name} pecah!`,
            `${victim.name} tidak berdaya lagi!`,
            `${victim.name} tidak sanggup bertarung lagi!`,
            `${victim.name} sudah tidak sanggup melawan!!`,
            `${attacker.name} merenggut nyawa ${victim.name}!`,
            `${victim.name} wafat di medan perang!`,
            `${victim.name} dipanggil Yang Maha Kuasa!`,
            `${victim.name} dibawa ke neraka!`,
            `${victim.name} telah dijemput kematian!`,
            `${victim.name} mati!`
        ],

        random_index = random(0, QUOTE_LIST.length-1);


    return QUOTE_LIST[random_index];
}


//======================================================================================================================
// > Encapsulation: Game
//----------------------------------------------------------------------------------------------------------------------
// Segala attribute dan method seputar game secara keseluruhan ditampung di sini
//======================================================================================================================

const Game = {

    //------------------------------------------------------------------------------------------------------------------
    // Ronde saat ini
    //------------------------------------------------------------------------------------------------------------------
    round: 0,

    //------------------------------------------------------------------------------------------------------------------
    // Turn saat ini
    //------------------------------------------------------------------------------------------------------------------
    turn: 0,

    //------------------------------------------------------------------------------------------------------------------
    // List pemain
    //------------------------------------------------------------------------------------------------------------------
    players: [],

    //------------------------------------------------------------------------------------------------------------------
    // List unit - Agar method-method di bawah dapat mengakses data unit (karena data-data dalam class yang
    // belum diinisiasi menjadi obyek akan selalu mereturn 'undefined' jika diakses begitu saja). Misalnya,
    // memanggil NoviceAdventurer.cost akan mereturn nilai 'undefined' dan bukan nilai asli dari attribute
    // tersebut
    //------------------------------------------------------------------------------------------------------------------
    units: [
        {} = new NoviceAdventurer(undefined),
        {} = new Saboteur(undefined),
        {} = new Builder(undefined),
        {} = new Bomber(undefined),
        {} = new Nightblade(undefined),
        {} = new Berserker(undefined),
        {} = new ColovianKnight(undefined),
        {} = new Voxblade(undefined),
        {} = new Vexanian(undefined),
        {} = new VampireBattlelord(undefined)
    ],

    //------------------------------------------------------------------------------------------------------------------
    // Mencakup seluruh behavior AI
    //------------------------------------------------------------------------------------------------------------------
    ai: {

        //------------------------------------------------------------------------------------------------------------------
        // NEW: AI kini pintar memilih target mana yang harus dinetralisir terlebih dahulu
        //------------------------------------------------------------------------------------------------------------------
        enhanced_target_acquisition(attacker) {
            const attackable_units = ai.enemy.get_attackable_units();
            const target_priority = [
                Game.units[4],  // Nightblade
                Game.units[3],  // Bomber
                Game.units[7],  // Voxblade
                Game.units[9]   // VampireBattlelord
            ];

            //----------------------------------------------------------------------------------------------------------
            // Memprioritaskan unit-unit di atas untuk diserang terlebih dahulu
            //----------------------------------------------------------------------------------------------------------
            for(let target of attackable_units) {
                for(let i=0; i<target_priority; i++) {
                    if(target.name === target_priority[i])
                        return target;
                }
            }

            //----------------------------------------------------------------------------------------------------------
            // Jika unit yang menyerang adalah Nightblade, serang kastil. Jika lawan memiliki Colovian, serang
            // Coloviannya!
            //----------------------------------------------------------------------------------------------------------
            if(attacker.hasOwnProperty('is_stealthed'))
                return attackable_units[0];

            //----------------------------------------------------------------------------------------------------------
            // Jika unit-unit di atas tidak dimiliki oleh lawan, prioritaskan unit dengan HP terkecil
            //----------------------------------------------------------------------------------------------------------
            const all_units_hp = [];

            for(let target of attackable_units) {
                all_units_hp.push(target.hp);
            }

            for(let target of attackable_units) {
                if(target.hp === Array.min(all_units_hp))
                    return target;
            }

            // OLD: return random(0, attackable_units.length -1)
        },

        //--------------------------------------------------------------------------------------------------------------
        // NEW: AI kini pintar membeli unit
        //--------------------------------------------------------------------------------------------------------------
        enhanced_production() {

            //----------------------------------------------------------------------------------------------------------
            // Jika kastil lawan low dan lawan memiliki Colovian Knight
            //----------------------------------------------------------------------------------------------------------
            if(ai.credit >= Game.units[1].cost && ai.enemy.get_castle_hp() < 5 && ai.enemy.has_colovian())
                return 2;

                //----------------------------------------------------------------------------------------------------------
                // Random decision making (default)
            //----------------------------------------------------------------------------------------------------------
            else
                return random(0,10);
        },

        //--------------------------------------------------------------------------------------------------------------
        // Berisi behavior serang-menyerang
        //--------------------------------------------------------------------------------------------------------------
        combat_module() {
            if(ai.has_movable_unit()) {
                for(let unit of ai.formation) {
                    if(ai.enemy.get_attackable_units().length <= 0)
                        break;

                    if(!unit.has_moved && unit.hp > 0 && !unit.is_castle) {
                        const target = Game.ai.enhanced_target_acquisition(unit);
                        unit.attack(target);
                    }
                }
            }
        },

        //--------------------------------------------------------------------------------------------------------------
        // Berisi behavior beli-membeli
        //--------------------------------------------------------------------------------------------------------------
        production_module() {
            let stop_turn = false;
            while(!stop_turn) {

                let decision = Game.ai.enhanced_production();

                let has_enough_credit;
                let has_other_unit = ai.formation.length > ai.enemy.formation.length;

                switch(decision) {
                    case 0: // Save credit (tidak beli apa-apa)
                        if(ai.enemy.formation.length >= ai.formation.length || ai.credit < 3)
                            stop_turn = true;
                        break;

                    case 1: // Novice Adv
                        has_enough_credit = ai.credit >= Game.units[decision - 1].cost;

                        if(has_enough_credit)
                            ai.buy_unit(new NoviceAdventurer(ai));
                        break;

                    case 2:     // Saboteur
                        has_enough_credit = ai.credit >= Game.units[decision - 1].cost;

                        if(has_enough_credit && has_other_unit) {
                            ai.buy_unit(new Saboteur(ai.enemy));
                            ai.enemy.formation[ai.enemy.formation.length - 1].sabotage();
                        }
                        break;

                    case 3:     // Builder
                        has_enough_credit = ai.credit >= Game.units[decision - 1].cost;

                        if(has_enough_credit && ai.get_castle_hp() < 30) {
                            ai.buy_unit(new Builder(ai));
                            ai.formation[ai.formation.length - 1].repair();
                        }
                        break;

                    case 4:     // Bomber
                        has_enough_credit = ai.credit >= Game.units[decision - 1].cost;

                        if(has_enough_credit && has_other_unit)
                            ai.buy_unit(new Bomber(ai));
                        break;

                    case 5:     // Nightblade
                        has_enough_credit = ai.credit >= Game.units[decision - 1].cost;

                        if(has_enough_credit)
                            ai.buy_unit(new Nightblade(ai));
                        break;

                    case 6:     // Berserker
                        has_enough_credit = ai.credit >= Game.units[decision - 1].cost;

                        if(has_enough_credit)
                            ai.buy_unit(new Berserker(ai));
                        break;

                    case 7:     // Colovian Knight
                        has_enough_credit = ai.credit >= Game.units[decision - 1].cost;

                        if(has_enough_credit)
                            ai.buy_unit(new ColovianKnight(ai));
                        break;

                    case 8:     // Voxblade
                        has_enough_credit = ai.credit >= Game.units[decision - 1].cost;

                        if(has_enough_credit)
                            ai.buy_unit(new Voxblade(ai));
                        break;

                    case 9:     // Vexanian
                        has_enough_credit = ai.credit >= Game.units[decision - 1].cost;

                        if(has_enough_credit)
                            ai.buy_unit(new Vexanian(ai));
                        break;

                    case 10:    // Vampire Battlelord
                        has_enough_credit = ai.credit >= Game.units[decision - 1].cost;

                        if(has_enough_credit)
                            ai.buy_unit(new VampireBattlelord(ai));
                        break;

                    default:
                        break;
                }
            }
        },

        //--------------------------------------------------------------------------------------------------------------
        // Dipanggil setiap kali giliran Ai bergerak tiba
        //--------------------------------------------------------------------------------------------------------------
        start_turn() {
            Game.ai.combat_module();
            Game.ai.production_module();
            console.log(`${ai.p_name} mengakhiri gilirannya!\n`);
            press_enter_to_continue();
            console.log();
            Game.end_turn();
        }
    },

    //------------------------------------------------------------------------------------------------------------------
    // Method untuk mengacak siapa yang bergerak duluan
    //------------------------------------------------------------------------------------------------------------------
    coin_flip() {
        const c = random(1,2);


        switch(c) {
            case 1:     // Player duluan
                Game.players.push(p1 = new Player('Anda'));
                Game.players.push(ai = new Player('Lawan'));
                break;

            case 2:     // AI duluan
                Game.players.push(ai = new Player('Lawan'));
                Game.players.push(p1 = new Player('Anda'));
                break;
        }

        p1.set_enemy(ai);
        ai.set_enemy(p1);

        console.log(`${Game.players[0].p_name} bergerak duluan!`);
        press_enter_to_continue();
        console.log(`\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`)
    },

    //------------------------------------------------------------------------------------------------------------------
    // Method untuk memajukan ronde permainan
    //------------------------------------------------------------------------------------------------------------------
    next_round() {

        //--------------------------------------------------------------------------------------------------------------
        // Masuk ke ronde berikutnya
        //--------------------------------------------------------------------------------------------------------------
        Game.round++;

        //--------------------------------------------------------------------------------------------------------------
        // Untuk setiap pemain yang memainkan permainan...
        //--------------------------------------------------------------------------------------------------------------
        for(let player of Game.players) {

            //----------------------------------------------------------------------------------------------------------
            // Menambahkan credit ke masing-masing player di tiap pergantian ronde
            //----------------------------------------------------------------------------------------------------------
            let credit_earning = (Game.round < MAX_CREDIT_GAIN)
                ? Game.round
                : MAX_CREDIT_GAIN;

            player.credit += credit_earning;
            player.credits_earned += credit_earning;

            if(player.credit > MAX_CREDITS)
                player.credit = MAX_CREDITS;

            //----------------------------------------------------------------------------------------------------------
            // Mereset has_moved semua unit non-kastil agar bisa bergerak kembali
            //----------------------------------------------------------------------------------------------------------
            for(let unit of player.formation) {
                if(!unit.is_castle) {
                    unit.has_moved = false;
                }
            }
        }
    },

    //------------------------------------------------------------------------------------------------------------------
    // Mengakhiri giliran
    //------------------------------------------------------------------------------------------------------------------
    end_turn() {

        //--------------------------------------------------------------------------------------------------------------
        // Jika kedua pemain sudah sama-sama bergerak, masuk ke ronde berikutnya!
        //--------------------------------------------------------------------------------------------------------------
        if(Game.turn === 1)
            Game.next_round();

        //--------------------------------------------------------------------------------------------------------------
        // Jika saat ini 0, set ke 1. Jika saat ini 1, set ke 0
        //--------------------------------------------------------------------------------------------------------------
        Game.turn = (Game.turn === 0)
            ? 1
            : 0;

        //--------------------------------------------------------------------------------------------------------------
        // Singkirkan unit mati dari formasi pertempuran
        //--------------------------------------------------------------------------------------------------------------
        const player = Game.players[Game.turn] === ai ? p1 : ai;
        for(let unit of player.formation) {
            if (unit.hp <= 0)
                player.formation.remove(unit);
        }

    },

    //------------------------------------------------------------------------------------------------------------------
    // Method untuk memulai permainan
    //------------------------------------------------------------------------------------------------------------------
    start() {
        Game.coin_flip();
        Game.next_round();

        let end_game = false;
        do {

            //------------------------------------------------------------------------------------------------------
            // Ditampilkan informasi-informasi berikut:
            // - Ronde keberapa
            // - Giliran siapa
            // - Formasi unit masing-masing pemain
            //------------------------------------------------------------------------------------------------------
            console.log(`<====== Ronde ${Game.round} ======>`);
            console.log(`Giliran: ${Game.players[Game.turn].p_name}\n`);

            //----------------------------------------------------------------------------------------------------------
            // Jika saat ini giliran player
            //----------------------------------------------------------------------------------------------------------

            const is_player_turn = (Game.players[Game.turn] === p1);
            if(is_player_turn) {

                p1.show_unit_formation();
                ai.show_unit_formation();

                console.log();
                console.log(`<=== Action Menu ===>`);
                console.log(`Credit(s): ${p1.credit}\n`);
                console.log(`1. Beli unit`);
                console.log(`2. Beri unit perintah`);
                console.log(`3. Akhiri Giliran\n`);

                const action = input_number("> ");
                console.log();

                switch(action) {
                    case 1:     // Beli Unit
                        console.log(`<=== Buy Menu ===>\n`);

                        let n = 1;
                        for(let unit of Game.units) {
                            console.log(`${n}. ${unit.get_profile()}`);
                            n++;
                        }

                        const select = input_number(`Pilih unit (Credit: ${p1.credit}): `) -1;

                        if(select < 0 || select >= Game.units.length) {
                            console.log(`Error: Input tidak dapat diterima!`);
                            press_enter_to_continue();
                        }

                        else if(p1.credit < Game.units[select].cost) {
                            console.log(`Anda tidak memiliki cukup credit untuk membeli unit ini!`);
                            press_enter_to_continue();
                        }

                        else {
                            switch(select) {
                                case 0: // Novice Adv
                                    p1.buy_unit(new NoviceAdventurer(p1));
                                    break;

                                case 1:     // Saboteur
                                    p1.buy_unit(new Saboteur(ai));
                                    p1.enemy.formation[p1.enemy.formation.length -1].sabotage();
                                    break;

                                case 2:     // Builder
                                    p1.buy_unit(new Builder(p1));
                                    p1.formation[p1.formation.length -1].repair();
                                    break;

                                case 3:     // Bomber
                                    p1.buy_unit(new Bomber(p1));
                                    break;

                                case 4:     // Nightblade
                                    p1.buy_unit(new Nightblade(p1));
                                    break;

                                case 5:     // Berserker
                                    p1.buy_unit(new Berserker(p1));
                                    break;

                                case 6:     // Colovian Knight
                                    p1.buy_unit(new ColovianKnight(p1));
                                    break;

                                case 7:     // Voxblade
                                    p1.buy_unit(new Voxblade(p1));
                                    break;

                                case 8:     // Vexanian
                                    p1.buy_unit(new Vexanian(p1));
                                    break;

                                case 9:    // Vampire Battlelord
                                    p1.buy_unit(new VampireBattlelord(p1));
                                    break;

                                default:
                                    break;
                            }
                            press_enter_to_continue();
                        }

                        console.log(``);
                        break;

                    case 2:     // Serang
                        if(p1.has_movable_unit()) {
                            const moveable_units = p1.get_movable_units();

                            console.log(`<=== Command Menu ===>\n`);
                            let i=0;
                            for(let unit of moveable_units) {
                                console.log(`${i+1}. ${unit.status()}`);
                                i++;
                            }
                            console.log();
                            const select_unit = input_number("Pilih unit untuk dikomando: ") -1;

                            if(select_unit < 0 || select_unit >= moveable_units.length) {
                                console.log(`Error: Input invalid!`);
                                press_enter_to_continue();
                                break;
                            }

                            //------------------------------------------------------------------------------------------

                            const attackable_targets = ai.get_attackable_units();

                            console.log(`\n<=== Formasi Unit Lawan ===>\n`);
                            i=0;
                            for(let target of attackable_targets) {
                                console.log(`${i+1}. ${target.status()}`);
                                i++;
                            }
                            console.log();
                            const select_target = input_number("Pilih target untuk diserang: ") -1;

                            if(select_target < 0 || select_target >= attackable_targets.length) {
                                console.log(`Error: Input invalid!`);
                                press_enter_to_continue();
                                break;
                            }

                            const unit = moveable_units[select_unit];
                            const target = attackable_targets[select_target];

                            unit.attack(target);
                            press_enter_to_continue();
                        }

                        else {
                            console.log(`Anda tidak memiliki unit yang dapat diberi perintah saat ini!`);
                            press_enter_to_continue();
                        }
                        console.log();
                        break;

                    case 3:     // End turn
                        console.log(`Mengakhiri giliran...\n\n\n`);
                        Game.end_turn();
                        break;

                    default:
                        console.log(`Error: Masukan yang benar!`);
                        press_enter_to_continue();
                        break;
                }

            }

            //----------------------------------------------------------------------------------------------------------
            // Jika saat ini adalah giliran AI
            //----------------------------------------------------------------------------------------------------------

            else {
                Game.ai.start_turn();
                console.log();
            }

            end_game = Game.victory_condition()

        }while(end_game);
        Game.victory_screen();
    },

    //------------------------------------------------------------------------------------------------------------------
    // Mengecek apakah ada kastil milik salah satu pemain yang sudah hancur
    //------------------------------------------------------------------------------------------------------------------
    victory_condition() {
        for(let player of Game.players) {
            if(player.get_castle_hp() <= 0)
                return false;
        }
        return true;
    },

    victory_screen() {
        for(let player of Game.players) {
            if(player.get_castle_hp() <= 0) {
                console.log(`Kastil ${player.p_name} hancur!`);
                console.log(`${player.enemy.p_name} memenangkan permainan!`);
                press_enter_to_continue();
                break;
            }
        }

        console.log(`\n<==== Rekap Pertempuran ====>`);
        console.log(`Total ronde: ${Game.round} ronde\n`);

        for(let player of Game.players) {
            console.log(`Rekap performa ${player.p_name}`);
            console.log(`- Total pendapatan credit  : ${player.credits_earned}`);
            console.log(`- TOtal pengeluaran credit : ${player.credits_spent}`);
            console.log(`- Total unit yang dibeli   : ${player.units_bought}`);
            console.log(`- Total damage diberikan   : ${player.damage_dealt}`);
            console.log();
        }
        press_enter_to_continue();
        console.log();

        console.log(`Game Over!`);
        press_enter_to_continue();

        Game.players.pop();
        Game.players.pop();
        console.log(`\n`);
    }
};


//======================================================================================================================
// # MAIN
//======================================================================================================================

console.log(TITLE);

let is_exit = false;
do {

    console.log('<==== Menu Utama ====>');
    console.log();
    console.log('1. Mulai Permainan');
    console.log('2. Petunjuk bermain');
    console.log('3. Keluar');
    console.log();

    const nav = input_number('> ');

    switch(nav) {
        case 1:     // Play
            Game.start();
            break;

        case 2:     // Help
            console.log(GUIDE, '\n');
            break;

        case 3:     // Exit
            is_exit = true;
            console.log('Menutup permainan...');
            break;

        default:
            console.log('Error: Mohon masukan yang benar!\n');
            break;
    }
}while(!is_exit);