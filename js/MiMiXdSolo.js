require('../config/settings')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@adiwajshing/baileys");
const fs = require("fs");
const cheerio = require("cheerio");
const chalk = require("chalk");
const crypto = require("crypto");
const { exec, spawn, execSync } = require("child_process");
const axios = require("axios");
const moment = require("moment-timezone");
const fetch = require("node-fetch");
const Jimp = require("jimp");
const util = require("util");
const { sizeFormatter} = require("human-readable")
const format = sizeFormatter()
const { color, bgcolor, mycolor } = require('./lib/color')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, parseMention, getRandom } = require('./lib/functions')

module.exports = MiMiXdSolo = async (MiMiXdSolo, m, chatUpdate, store) => {
try {
const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
const budy = (typeof m.text == 'string' ? m.text : '')
const prefix = /^[°#*+,.?=''():√%!¢£¥€π¤ΠΦ_&`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°#*+,.?=''():√%¢£¥€π¤ΠΦ_&!`™©®Δ^βα¦|/\\©^]/gi) : '.'
const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
const content = JSON.stringify(m.message)
const { type, quotedMsg, mentioned, now, fromMe } = m
const isCmd = body.startsWith(prefix)
const from = m.key.remoteJid
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const pushname = m.pushName || "No Name"
const botNumber = await MiMiXdSolo.decodeJid(MiMiXdSolo.user.id)
const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const itsMe = m.sender == botNumber ? true : false
const text = q = args.join(" ")
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const isMedia = /image|video|sticker|audio/.test(mime)
const { chats } = m

const tanggal = moment.tz('Asia/Jakarta').format('DD/MM/YY')
const isGroup = m.key.remoteJid.endsWith('@g.us')
const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
const groupMetadata = m.isGroup ? await MiMiXdSolo.groupMetadata(m.chat).catch(e => {}) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
const groupOwner = m.isGroup ? groupMetadata.owner : ''
const groupMembers = m.isGroup ? groupMetadata.participants : ''
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const isPrem = JSON.parse(fs.readFileSync("./MiMiXd Solo/Database/Premium.json"))
const isSPrem = JSON.parse(fs.readFileSync("./MiMiXd Solo/Database/SPremium.json"))
	
if (!MiMiXdSolo.public) {
if (!m.key.fromMe) return
}

if (isCmd && m.isGroup) { console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Group Chat"), chalk.bold('[' + args.length + ']')); }
if (isCmd && !m.isGroup) { console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Private Chat"), chalk.bold('[' + args.length + ']')); }
		
try {
ppuser = await MiMiXdSolo.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
ppnyauser = await getBuffer(ppuser)

const generateProfilePicture = async(buffer) => {
const jimp_1 = await Jimp.read(buffer);
const ress = JSON.parse(fs.readFileSync('./ress.json').toString())
const resz = jimp_1.getWidth() > jimp_1.getHeight() ? jimp_1.resize(550, Jimp.AUTO) : jimp_1.resize(Jimp.AUTO, 650)
const jimp_2 = await Jimp.read(await resz.getBufferAsync(Jimp.MIME_JPEG));
return {
img: await resz.getBufferAsync(Jimp.MIME_JPEG)
}
}



switch (command) {
 // menu 
case "list":
menump3 = fs.readFileSync('./menu.mp3')
m.reply(`
| - .listadmin (Admin Panel)
| - .listpanel (Panel Bot)
| - .listwhm (Harga WHM)
| - .listsmtp (Harga SMTP)
| - .listreseller (List Reseller SMTP)
| - .listmurid (List Murid SMTP)
| - .jinstall (Jasa Install)
| - .jcurl (Jasa Curl)
| - .listtools (Harga Tools)
| - .listvps ( Harga VPS) `)
break
    
    
case "nostok":
m.reply(`PRODUK SEDANG HABIS`)
break
 
case "help": case "menuuuuuuu":
m.reply(`▢═┅═━–( MiMiXd Solo )–═┅═━▢

▢═┅═━–( Store Menu )–═┅═━▢
┊•-.list (munculkan list jualan)
┊•-.pay (munculkan list payment)
┊•-.dv (untuk done vps)
┊•-.d (untuk done transaksi)
┊━━▢ 


▢═┅═━–( Owner Menu )–═┅═━▢
┊•-.rw
┊•-.rv
┊•-.rjc
┊•-.rs
┊•-.rsm
┊•-.ra
┊•-.rrs
┊•-.gcs
┊•-.gca
┊•-.dv
┊━━▢ 
▢═┅═━–( MiMiXd Solo )–═┅═━▢`)
break 

case "help": case "menu":
m.reply(`▢═┅═━–( MiMiXd Solo )–═┅═━▢

▢═┅═━–( Menu )–═┅═━▢
┊•-.fr (munculkan list Fee)
┊•-.fjp (munculkan Format JP)
┊•-.dsuk
┊•-.pay (munculkan list payment)
┊•-.dmc (untuk done MC)
┊•-.d (untuk done transaksi)
┊━━▢ 
▢═┅═━–( MiMiXd Solo )–═┅═━▢`)
break 	

case "fr":
m.reply(`Fee Rekber MiMiXd Solo

0 - 49K = 5K
50 - 199K = 10K
200K - 299K = 20K
300K - 399K = 25K
400K - 599K = 35K
600K - 999K = 50K
1JT - 1.99JT = 75K
2JT - 3JT = 100K
3JT+ = 200K
BT/TT 25K

| TRX BATAL FEE KEPOTONG |`)
break 	

case "fjp":
m.reply(`*FORMAT JAPOST BY MiMiXd Solo*
(BUKAN AKUN ADMIN) 

• AKUN: 
• SPEK: 
• HARGA: 
• LOG: 
• A2F: 
• MC: 

WA REAL MiMiXd Solo : 081231319623
NOTE: Wajib Menggunakan Jasa Rekber MiMiXd Solo`)
break 	
		

case "gca":
if (!isCreator) return        
m.reply(`Link Grup Admin Panel
https://chat.whatsapp.com/L3dyRpbH01fHmsbBcJfF8G

*NOTE :*
- Silahkan Join Ke Grup
- Silahkan Langsung Login Ke Akun Sesuai Dengan Request an
- Admin Tidak Mengirimkan Data`)
break		
		

case "gcs":
if (!isCreator) return        
m.reply(`Link Grup Client SMTP
https://chat.whatsapp.com/HmkvWA3RWOeIKqFujNTGuu

*NOTE :*
- Silahkan Join Ke Grup
- Silahkan Langsung Login Ke Akun Sesuai Dengan Request an
- Admin Tidak Mengirimkan Data`)
break		

		
 case "rsm":
if (!isCreator) return        
m.reply(`Request Data SMTP
| - Username : 
| - PassWord : `)
break       

case "rjc":
if (!isCreator) return        
m.reply(`Request Jasa Curl
| - Nama Ress : 
| - Link Pusat : `)
break       		
        
case "ra":
if (!isCreator) return        
m.reply(`Request Data Admin Panel
| - Username : 
| - PassWord : `)
break
                
        
case "rw":
if (!isCreator) return        
m.reply(`Request Data WHM
| - Username : 
| - PassWord : @@server@@1

(Untuk PassWord Tidak Bisa Request)`)
break
        
case "rv":
if (!isCreator) return        
m.reply(`Request Data VPS
| - OS : 
| - Region : 
| - PassWord : `)
break

case "dsuk":
if (!isCreator) return        
m.reply(`*Dana Masuk Silahkan Seller Mengirimkan Data/Cein Data Akun*

*Be Smart A Seller And Buyer*`)
break  		
        
case "rs":
if (!isCreator) return        
m.reply(`Request Data Server
| - Link : 
| - Username : 
| - PassWord : `)
break           

case "d":
if (!isCreator) return (`Fitur Khusus MiMiXd Solo Bang`)
let le = text.split(',');
if (le.length < 2) return m.reply(`ketik d item,harga`)
let ko1 = le[0];
let ko2 = le[1];
txtd = `🗓️ TANGGAL PEMBELIAN : ${tanggal}
🔰 ITEM : ${ko1}
💵 HARGA : ${ko2}

Terima Kasih Sudah Berbelanja Di MiMiXd Solo`
m.reply(txtd)
break
case "dmc":
if (!isCreator) return (`Fitur Khusus MiMiXd Solo Bang`)
let lee = text.split(',');
if (lee.length < 2) return m.reply(`ketik d barang,harga`)
let kow1 = lee[0];
let kow2 = lee[1];
txtd = `*ALL TRX DONE*

Barang : ${kow1}
Harga : ${kow2} 
Sistem : MC MiMiXd Solo

Note : 
- *BUYER DAN SELLER SUDAH MENGATAKAN DONE*
- *ADMIN TIDAK BERTANGGUNG JAWAB KARENA BUYER DAN SELLER SUDAH MENGATAKAN DONE*
- *BE SMART A BUYER AND SELLER*

*MiMiXd Solo*`
m.reply(txtd)
break       
case 'pay':
qr1 = "https://telegra.ph/file/dcec909d53e2f68b3e4ac.jpg" 		
ctf = `───「  *PAYMENT*  」────

- *Dana :* 081231319622
- *Gopay :*  081231886592
- *Qris :* Scan qr di atas

*NOTE :*
- Jangan Lupa Kirim Bukti TF
- Tidak Ada Bukti TF = Tidak Di Respon
- Jangan Spam Admin Juga Ada Buyer Lain

*Be Smart A Buyer*`
MiMiXdSolo.sendMessage(from,{image: {url: qr1}, caption: ctf }, { quoted: MiMiXdSolo.chat })
break

case 'lllll':
m.reply(global.danapayment)
break
case "llllllllllll":
 m.reply(global.gopaypayment)
 break
 //group


case "assalamualaikum":case "asalamualaikum":case "lamlaikum":case "samlikum":
if (isGroup) return
 m.reply(`waalaikumsalam`)
break
// tools

case "setpp": {
if (!isCreator) return (`Fitur Khusus MiMiXd Solo Bang`)
m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (!/image/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
if (/webp/.test(mime)) return m.reply(`Kirim/Reply Image Dengan Caption ${prefix + command}`)
var medis = await MiMiXdSolo.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
if (args[0] == `/full`) {
var { img } = await generateProfilePicture(medis)
await MiMiXdSolo.query({
tag: 'iq',
attrs: {
to: botNumber,
type:'set',
xmlns: 'w:profile:picture'
},
content: [
{
tag: 'picture',
attrs: { type: 'image' },
content: img
}
]
})
fs.unlinkSync(medis)
m.reply(`Sukses`)
} else {
var memeg = await MiMiXdSolo.updateProfilePicture(botNumber, { url: medis })
fs.unlinkSync(medis)
m.reply(`Sukses`)
}
}
break


// jualan gw
case "jcurl" : {
m.reply(`[ *List Jasa Curl* ]

5 Tamp : 30k
7 Tamp : 40k
10 Tamp : 60k


- Terima Jadi
- Free Domain
- Auto Balmod

Jika Minat Chat wa.me/6281231319622`)
}
break		
case "jinstall" : {
m.reply(`[ *List Jasa Install* ]

Panel Bot
2gb 1core : 25k
4gb 2core : 40k
8gb 4core : 50k

Server WHM
2gb 1core : 30k
4gb 2core : 50k
8gb 4core : 70k

GARANSI 7 DAY

keuntungan :

- Terima Jadi
- Bisa Req Domain
- Auto Balmod

Jika Minat Chat wa.me/6281231319622`)
}
break
case "buypanel": case "listpanel":{
m.reply(`[ *LIST HARGA PANEL* ]

1gb : 1k
2gb : 2k
3gb : 3k
4gb : 4k
5gb : 5k
UNLI : 7k

GARANSI 10 DAY

keuntungan :

- bisa buat run bot 
- 24 jam
- bergaransi

Jika Minat Chat wa.me/6281231319622`)
}
break

case "buyadminpanel": case "listadmin":{
m.reply(`[ *LIST HARGA ADMIN PANEL* ]

HARGA = ~10K~ 5k

GARANSI 10 DAY

keuntungan :

- bisa buat jualan
- auto balik modal
- bergaransi

Jika Minat Chat wa.me/6281231319622`)
}
break
case "buyvps": case "listvps":{
m.reply(`[ *LIST HARGA VPS* ]

2gb 1core : 20k
4gb 2core : 35k
8gb 4core : 45kk

GARANSI 7 DAY

keuntungan :

- bisa buat run bot langsung tanpa panel
- bisa buat admin whm/cpanel
- bisa buat apa saja tergantung pemakai

Jika Minat Chat wa.me/6281231319622`)
}
break
 case "buytools": case "listtools":{
m.reply(`[ *LIST TOOLS* ]

- TOOLS SCRIPT BOT
bot panel +store : 40k

sc store +payment : 20k

sc payment : 5k

INGIN BUAT SC PRIBADI?
BISA PAKAI JASA SAYA
HARGA TERGANTUNG FITUR

Jika Minat Chat wa.me/6281231319622`)
}
break
        
case "buywhm": case "listwhm":{
m.reply(`[ *LIST HARGA WHM* ]

Redy Kebutuhan Hosting 
WHm Mini : 15k
Whm Medium : 20k
Whm Extra : 25k
Whm Super : 30k

Mwhm mini : 35k
Mwhm Medium : 40k
Mwhwm Extra : 45k
Mwhm Super : 50k

Admin Host : 60k
CEO Host : 70k
Wakil Founder : 80k
Root : 90k


GARANSI 10 DAY

keuntungan :

- bisa buat web p 
- auto ssl
- supp all
- bergaransi

Jika Minat Chat wa.me/6281231319622`)
}
break   
        
case "buysmtp": case "listsmtp":{
m.reply(`[ *LIST HARGA SMTP* ]

1 Minggu : 20k
2 Minggu : 35k
3 Minggu : 45k
1 Bulan : 60k



keuntungan :

- Support AutoRess
- Support Bot
- Support Panel Murni

Jika Minat Chat wa.me/6281231319622`)
}
break  
        
case "buyreseller": case "listreseller":{
m.reply(`[ *LIST HARGA Reseller SMTP* ]

Akses cPanel : 30k
Akses Root : 60k



keuntungan :

- Support AutoRess
- Support Bot
- Support Panel Murni

Jika Minat Chat wa.me/6281231319622`)
}
break   
        
 case "buymurid": case "listmurid":{
m.reply(`[ *LIST HARGA Murid Install Server SMTP* ]

Open Murid Install Server SMTP 
 
Sistem Relay : 150k
Free Vps 
Free SMTP Buat Relay

Sistem Postifix : 200k
Wajib Vps Port 25
Di Ajarin Full



keuntungan :

- Support AutoRess
- Support Bot
- Support Panel Murni

Jika Minat Chat wa.me/6281231319622`)
}
break  

		
//Case Hosting By MiMiXd Solo                                        
case 'csubdo':
 if(from != "120363042323874758@g.us") return m.reply("Fitur Hanya Untuk Grup Tertentu Mang")
        function subDomain1(host, ip) {
          return new Promise((resolve) => {
            let zone1 = "be9f18e21607d9889fe70c398e3a2598";
            let apiToken1 = "JsNX3n-Mpnj1PG6wrNnqyljfF7TLSr78MbwTTri_";
            let tld1 = "sczd.my.id";
            axios.post(
                `https://api.cloudflare.com/client/v4/zones/${zone1}/dns_records`,
                { type: "A", name: host.replace(/[^a-z0-9.-]/gi, "") + "." + tld1, content: ip.replace(/[^0-9.]/gi, ""), ttl: 3600, priority: 10, proxied: false },
                {
                  headers: {
                    Authorization: "Bearer " + apiToken1,
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((e) => {
                let res = e.data;
                if (res.success) resolve({ success: true, zone: res.result?.zone_name, name: res.result?.name, ip: res.result?.content });
              })
              .catch((e) => {
                let err1 = e.response?.data?.errors?.[0]?.message || e.response?.data?.errors || e.response?.data || e.response || e;
                let err1Str = String(err1);
                resolve({ success: false, error: err1Str });
              });
          });
        }

        let raw1 = args?.join(" ")?.trim();
        if (!raw1) return m.reply("mana host & ip nya?");
        let host1 = raw1
          .split("|")[0]
          .trim()
          .replace(/[^a-z0-9.-]/gi, "");
        if (!host1) return m.reply("host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)");
        let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
        if (!ip1 || ip1.split(".").length < 4) return m.reply(ip1 ? "ip tidak valid" : "mana ip nya");

        subDomain1(host1, ip1).then((e) => {
          if (e['success']) m.reply(`berhasil menambah subdomain\nip: ${e['ip']}\nhostname: ${e['name']}`);
          else m.reply(`gagal membuat subdomain\nMsg: ${e['error']}`)
        });
        break		

case 'listgc': {
	         if (!isCreator) return m.reply(`Fitur Khusus MiMiXd Solo Bang`)
                 let anu = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)
                 let teks = `⬣ LIST GROUP CHAT\n\nTotal Group : ${anu.length} Group\n\n`
                 for (let i of anu) {
                     let metadata = await MiMiXdSolo.groupMetadata(i)
                     teks += `› Nama : ${metadata.subject}\n› ID : ${metadata.id}\n› Dibuat : ${moment(metadata.creation * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n› Member : ${metadata.participants.length}\n\n────────────────────────\n\n`
                 }
                 MiMiXdSolo.sendTextWithMentions(m.chat, teks, m)
             }
             break 

 


default:
}
if (budy.startsWith('$')) {
 if (!isCreator) return reply(mess.owner)
 exec(budy.slice(2), (err, stdout) => {
 if(err) return m.reply(err)
 if (stdout) return m.reply(stdout)
 })
 }
if (budy.startsWith('>')) {
if (!isCreator) return m.reply(`Maaf Command Tersebut Khusus Developer Bot WhatsApp`)
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await m.reply(evaled)
} catch (err) {
m.reply(String(err))
}
}
} catch (err) {
m.reply(util.format(err))
}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})
