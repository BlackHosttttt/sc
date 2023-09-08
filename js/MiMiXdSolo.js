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
| - .listadmin
| - .listpanel
| - .listwhm
| - .listsmtp
| - .listreseller
| - .listmurid
| - .listtools
| - .listvps`)
break
    
    
case "nostok":
m.reply(`PRODUK SEDANG HABIS`)
break
 
 case "add":{
if (!isCreator) return m.reply(`Khusus Owner Goblok`)
if (!args[0]) return m.reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6281231319622`)
prrkek = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await MiMiXdSolo.onWhatsApp(prrkek)
if (ceknya.length == 0) return m.reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
isPrem.push(prrkek)
fs.writeFileSync("./MiMiXd Solo/Database/Premium.json", JSON.stringify(isPrem))
m.reply(`Nomor ${prrkek} Sudah Bisa Akses!`)
}
break
case "del":{
if (!isCreator) return m.reply(`Khusus Owner Goblok`)
if (!args[0]) return m.reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
unp = isPrem.indexOf(ya)
isPrem.splice(unp, 1)
fs.writeFileSync("./MiMiXd Solo/Database/Premium.json", JSON.stringify(isPrem))
m.reply(`Nomor ${ya} Telah Di Hapus Akses!`)
}
break
        
case "listusr": {
 if (!isPrem) return m.reply(`KHUSUS PREMIUM`)
  if (!isSPrem) return m.reply(`KHUSUS PREMIUM`)
  if (!isCreator) return m.reply(`KHUSUS PREMIUM`) 
  let page = args[0] ? args[0] : '1';
  let f = await fetch(domain + "/api/application/users?page=" + page, {
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apikey
    }
  });
  let res = await f.json();
  let users = res.data;
  let messageText = "Berikut list user:\n\n";
  
  for (let user of users) {
    let u = user.attributes;
    messageText += `ID: ${u.id} - Status: ${u.attributes?.user?.server_limit === null ? 'Inactive' : 'Active'}\n`;
    messageText += `${u.username}\n`;
    messageText += `${u.first_name} ${u.last_name}\n\n`;
  }
  
  messageText += `Page: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
  messageText += `Total Users: ${res.meta.pagination.count}`;
  
  await MiMiXdSolo.sendMessage(m.chat, { text: messageText }, { quoted: m });
  
  if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
    m.reply(`Gunakan perintah ${prefix}listusr ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
  }
}
break
        
case "listsrv": {
 if (!isPrem) return m.reply(`KHUSUS PREMIUM`)
  if (!isSPrem) return m.reply(`KHUSUS PREMIUM`)
  if (!isCreator) return m.reply(`KHUSUS PREMIUM`)  
  let page = args[0] ? args[0] : '1';
  let f = await fetch(domain + "/api/application/servers?page=" + page, {
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + apikey
    }
  });
  let res = await f.json();
  let servers = res.data;
  let sections = [];
  let messageText = "Berikut adalah daftar server:\n\n";
  
  for (let server of servers) {
    let s = server.attributes;
    
    let f3 = await fetch(domain + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
      "method": "GET",
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + capikey
      }
    });
    
    let data = await f3.json();
    let status = data.attributes ? data.attributes.current_state : s.status;
    
    messageText += `ID Server: ${s.id}\n`;
    messageText += `Nama Server: ${s.name}\n`;
    messageText += `Status: ${status}\n\n`;
  }
  
  messageText += `Halaman: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
  messageText += `Total Server: ${res.meta.pagination.count}`;
  
  await MiMiXdSolo.sendMessage(m.chat, { text: messageText }, { quoted: m });
  
  if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
    m.reply(`Gunakan perintah ${prefix}listsrv ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya.`);
  }
}
break        
        
case 'listprem':{
if (!isCreator) return m.reply(`Khusus Owner Goblok`)
let listprem =`*LIST SELER MiMiXd Solo*\n\nTotal Seller : ${owner.length}\n`
var no = 1
for (let x of owner) {
listprem +=`\nUser: ${no++}\nID: ${x}\n\n`
}
listprem +=`Untuk Menghapus Akses Prem Ketik ${prefix}delprem 628xxx/@tag`
MiMiXdSolo.sendMessage(m.chat, {text: listprem },{quoted: MiMiXdSolo.chat})
}
break
        
        
 
case "delsrv": {
  if (!isPrem) return m.reply(`KHUSUS PREMIUM`)
  if (!isSPrem) return m.reply(`KHUSUS PREMIUM`)
  if (!isCreator) return m.reply(`KHUSUS PREMIUM`)  

let srv = args[0]
if (!srv) return m.reply('ID nya mana?')
let f = await fetch(domain + "/api/application/servers/" + srv, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return m.reply('SERVER NOT FOUND')
m.reply('SUCCESSFULLY DELETE THE SERVER')
}
        break
        case "delusr": {
  if (!isPrem) return m.reply(`KHUSUS PREMIUM`)
  if (!isSPrem) return m.reply(`KHUSUS PREMIUM`)
  if (!isCreator) return m.reply(`KHUSUS PREMIUM`)          
let usr = args[0]
if (!usr) return m.reply('ID nya mana?')
let f = await fetch(domain + "/api/application/users/" + usr, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = f.ok ? {
errors: null
} : await f.json()
if (res.errors) return m.reply('USER NOT FOUND')
m.reply('SUCCESSFULLY DELETE THE USER')
}
        break        
        
        
 
        
case "addsp":{
if (!isCreator) return m.reply(`Khusus Owner Goblok`)
if (!args[0]) return m.reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6281231319622`)
prrkek = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
let ceknya = await MiMiXdSolo.onWhatsApp(prrkek)
if (ceknya.length == 0) return m.reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
isSPrem.push(prrkek)
fs.writeFileSync("./MiMiXd Solo/Database/SPremium.json", JSON.stringify(isSPrem))
m.reply(`Nomor ${prrkek} Telah Menjadi Super Premium!`)
}
break
case "delsp":{
if (!isCreator) return m.reply(`Khusus Owner Goblok`)
if (!args[0]) return m.reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 6285798145596`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')+`@s.whatsapp.net`
unp = isSPrem.indexOf(ya)
isSPrem.splice(unp, 1)
fs.writeFileSync("./MiMiXd Solo/Database/SPremium.json", JSON.stringify(isSPrem))
m.reply(`Nomor ${ya} Telah Di Hapus Dari Super Premium!`)
}
break
        
case 'listsp':{
if (!isCreator) return m.reply(`Khusus Owner Goblok`)
let listprem =`*LIST Super Premium MiMiXd Solo*\n\nTotal Seller : ${owner.length}\n`
var no = 1
for (let x of owner) {
listprem +=`\nUser: ${no++}\nID: ${x}\n\n`
}
listprem +=`Untuk Menghapus Akses Ketik ${prefix}del 628xxx/@tag`
MiMiXdSolo.sendMessage(m.chat, {text: listprem },{quoted: MiMiXdSolo.chat})
}
break        
    
        
case "cadmin": {
if (!isCreator) return m.reply(`Khusus Super Premium Goblok`)
if (!isSPrem) return m.reply(`Khusus Super Premium Goblok`)
let s = q.split(',')
let email = s[0];
let username = s[0]
let nomor = s[1]
if (s.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
if (!username) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
if (!nomor) return reply(`Ex : ${prefix+command} Username,@tag/nomor\n\nContoh :\n${prefix+command} example,@user`)
let password = username + "019"
let nomornya = nomor.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": username + "@gmail.com",
"username": username,
"first_name": username,
"last_name": "Memb",
"language": "en",
 "root_admin" : true,  
"password": password.toString()
})

})

let data = await f.json();

if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));

let user = data.attributes

let tks = `
 TYPE: Admin Panel

📡ID: ${user.id}
🌷UUID: ${user.uuid}
👤USERNAME: ${user.username}
📬EMAIL: ${user.email}
🦖NAME: ${user.first_name} ${user.last_name}
🔥LANGUAGE: ${user.language}
📊ADMIN: ${user.root_admin}
☢CREATED AT: ${user.created_at}
`
    const listMessage = {

        text: tks,

    }

	

    await MiMiXdSolo.sendMessage(m.chat, listMessage)

    await MiMiXdSolo.sendMessage(nomornya, {

        text: `*BERIKUT DETAIL AKUN ADMIN  PANEL ANDA*\n

USERNAME :  ${username}
PASSWORD: ${password}
LOGIN: ${domain}

*YOUTUBE OWNER :*
https://youtube.com/@MiMiXdSolo

*GRUP OWNER :*
https://chat.whatsapp.com/GbWXaXcNdOCFjeH5XEqnTT

NOTE : OWNER HANYA MENGIRIM 1X DATA AKUN ANDA MOHON DI SIMPAN BAIK BAIK KALAU DATA AKUN ANDA HILANG OWNER TIDAK DAPAT MENGIRIM AKUN ANDA LAGI


`,

    })

} 
break        
        
case "mimi1gb": {
if (!isCreator) return m.reply(`Khusus Reseller Goblok`)
if (!isSPrem) return m.reply(`Khusus Reseller Goblok`)    
if (!isPrem) return m.reply(`Khusus Reseller Goblok`)
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = global.eggsnya
let loc = global.location
let memo = "1000"
let cpu = "60"
let disk = "0"
let email = username + "@s.id"
akunlo = "https://telegra.ph/file/e55bca19cb1de38cf998f.jpg" 
if (!u) return
let d = (await MiMiXdSolo.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}
⎙─➤ *😎PEMILIK SERVER* : *MiMiXd Solo*


*YOUTUBE OWNER :*
https://youtube.com/@MiMiXdSolo

*GRUP OWNER :*
https://chat.whatsapp.com/GbWXaXcNdOCFjeH5XEqnTT

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
MiMiXdSolo.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: MiMiXdSolo.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)}
break   
        
case "mimi2gb": {
if (!isCreator) return m.reply(`Khusus Reseller Goblok`)
if (!isSPrem) return m.reply(`Khusus Reseller Goblok`)    
if (!isPrem) return m.reply(`Khusus Reseller Goblok`)  
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = global.eggsnya
let loc = global.location
let memo = "2000"
let cpu = "90"
let disk = "0"
let email = username + "@s.id"
akunlo = "https://telegra.ph/file/e55bca19cb1de38cf998f.jpg" 
if (!u) return
let d = (await MiMiXdSolo.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}
⎙─➤ *😎PEMILIK SERVER* : *MiMiXd Solo*


*YOUTUBE OWNER :*
https://youtube.com/@MiMiXdSolo

*GRUP OWNER :*
https://chat.whatsapp.com/GbWXaXcNdOCFjeH5XEqnTT

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
MiMiXdSolo.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: MiMiXdSolo.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)}
break 
        
case "mimi3gb": {
if (!isCreator) return m.reply(`Khusus Reseller Goblok`)
if (!isSPrem) return m.reply(`Khusus Reseller Goblok`)    
if (!isPrem) return m.reply(`Khusus Reseller Goblok`)  
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = global.eggsnya
let loc = global.location
let memo = "3000"
let cpu = "120"
let disk = "0"
let email = username + "@s.id"
akunlo = "https://telegra.ph/file/e55bca19cb1de38cf998f.jpg" 
if (!u) return
let d = (await MiMiXdSolo.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}
⎙─➤ *😎PEMILIK SERVER* : *MiMiXd Solo*


*YOUTUBE OWNER :*
https://youtube.com/@MiMiXdSolo

*GRUP OWNER :*
https://chat.whatsapp.com/GbWXaXcNdOCFjeH5XEqnTT

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
MiMiXdSolo.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: MiMiXdSolo.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)}
break 
        
case "mimi4gb": {
if (!isCreator) return m.reply(`Khusus Reseller Goblok`)
if (!isSPrem) return m.reply(`Khusus Reseller Goblok`)    
if (!isPrem) return m.reply(`Khusus Reseller Goblok`)  
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = global.eggsnya
let loc = global.location
let memo = "4000"
let cpu = "160"
let disk = "0"
let email = username + "@s.id"
akunlo = "https://telegra.ph/file/e55bca19cb1de38cf998f.jpg" 
if (!u) return
let d = (await MiMiXdSolo.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}
⎙─➤ *😎PEMILIK SERVER* : *MiMiXd Solo*


*YOUTUBE OWNER :*
https://youtube.com/@MiMiXdSolo

*GRUP OWNER :*
https://chat.whatsapp.com/GbWXaXcNdOCFjeH5XEqnTT

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
MiMiXdSolo.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: MiMiXdSolo.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)}
break         

case "help": case "menu":
m.reply(`▢═┅═━–( MiMiXd Solo )–═┅═━▢

▢═┅═━–( Reseller Menu )–═┅═━▢
┊•-.mimi1gb (Crete Panel Ram 1)
┊•-.mimi2gb (Crete Panel Ram 2)
┊•-.mimi3gb (Crete Panel Ram 3)
┊•-.mimi4gb (Crete Panel Ram 4)
┊•-.mimi5gb (Crete Panel Ram 5)
┊•-.mimi6gb (Crete Panel Ram 6)
┊•-.mimi6gb (Crete Panel Ram 7)
┊•-.mimiunli (Crete Panel Unli)
┊•-.listusr (Menampilkan List User)
┊•-.listsrv (Menampilkan List Server)
┊•-.delusr (Menghapust User)
┊•-.delsrv (Menghapust Server)
┊━━▢ 


▢═┅═━–( Super Premium Menu )–═┅═━▢
┊•-.cadmin (Membuat Admin Panel)
┊━━▢ 


▢═┅═━–( Store Menu )–═┅═━▢
┊•-.list (munculkan list jualan)
┊•-.pay (munculkan list payment)
┊•-.dv (untuk done vps)
┊•-.d (untuk done transaksi)
┊━━▢ 


▢═┅═━–( Owner Menu )–═┅═━▢
┊•-.add
┊•-.del
┊•-.listprem
┊•-.addsp
┊•-.delsp
┊•-.listsp
┊•-.rw
┊•-.rv
┊•-.rs
┊•-.rsm
┊•-.ra
┊•-.dv
┊•-.ds
┊━━▢ 
▢═┅═━–( MiMiXd Solo )–═┅═━▢`)
break
        
case "mimi5gb": {
if (!isCreator) return m.reply(`Khusus Reseller Goblok`)
if (!isSPrem) return m.reply(`Khusus Reseller Goblok`)    
if (!isPrem) return m.reply(`Khusus Reseller Goblok`)
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = global.eggsnya
let loc = global.location
let memo = "5000"
let cpu = "190"
let disk = "0"
let email = username + "@s.id"
akunlo = "https://telegra.ph/file/e55bca19cb1de38cf998f.jpg" 
if (!u) return
let d = (await MiMiXdSolo.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}
⎙─➤ *😎PEMILIK SERVER* : *MiMiXd Solo*


*YOUTUBE OWNER :*
https://youtube.com/@MiMiXdSolo

*GRUP OWNER :*
https://chat.whatsapp.com/GbWXaXcNdOCFjeH5XEqnTT

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
MiMiXdSolo.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: MiMiXdSolo.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)}
break
        
case "mimi6gb": {
if (!isCreator) return m.reply(`Khusus Reseller Goblok`)
if (!isSPrem) return m.reply(`Khusus Reseller Goblok`)    
if (!isPrem) return m.reply(`Khusus Reseller Goblok`)
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = global.eggsnya
let loc = global.location
let memo = "6000"
let cpu = "220"
let disk = "0"
let email = username + "@s.id"
akunlo = "https://telegra.ph/file/e55bca19cb1de38cf998f.jpg" 
if (!u) return
let d = (await MiMiXdSolo.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}
⎙─➤ *😎PEMILIK SERVER* : *MiMiXd Solo*


*YOUTUBE OWNER :*
https://youtube.com/@MiMiXdSolo

*GRUP OWNER :*
https://chat.whatsapp.com/GbWXaXcNdOCFjeH5XEqnTT

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
MiMiXdSolo.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: MiMiXdSolo.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)}
break
        
case "mimi7gb": {
if (!isCreator) return m.reply(`Khusus Reseller Goblok`)
if (!isSPrem) return m.reply(`Khusus Reseller Goblok`)    
if (!isPrem) return m.reply(`Khusus Reseller Goblok`)
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = global.eggsnya
let loc = global.location
let memo = "7000"
let cpu = "260"
let disk = "0"
let email = username + "@s.id"
akunlo = "https://telegra.ph/file/e55bca19cb1de38cf998f.jpg" 
if (!u) return
let d = (await MiMiXdSolo.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}
⎙─➤ *😎PEMILIK SERVER* : *MiMiXd Solo*


*YOUTUBE OWNER :*
https://youtube.com/@MiMiXdSolo

*GRUP OWNER :*
https://chat.whatsapp.com/GbWXaXcNdOCFjeH5XEqnTT

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
MiMiXdSolo.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: MiMiXdSolo.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)}
break 
        
case "mimiunli": {
if (!isCreator) return m.reply(`Khusus Reseller Goblok`)
if (!isSPrem) return m.reply(`Khusus Reseller Goblok`)    
if (!isPrem) return m.reply(`Khusus Reseller Goblok`)
let t = text.split(',');
if (t.length < 2) return m.reply(`*Format salah!*
Penggunaan:
${prefix + command} user,nomer`)
let username = t[0];
let u = m.quoted ? m.quoted.sender : t[1] ? t[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
let name = username
let egg = global.eggsnya
let loc = global.location
let memo = "0"
let cpu = "0"
let disk = "0"
let email = username + "@s.id"
akunlo = "https://telegra.ph/file/e55bca19cb1de38cf998f.jpg" 
if (!u) return
let d = (await MiMiXdSolo.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": email,
"username": username,
"first_name": username,
"last_name": username,
"language": "en",
"password": password
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
let f2 = await fetch(domain + "/api/application/nests/5/eggs/" + egg, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
m.reply(`SUCCES CREATE USER ID: ${user.id}`)
ctf = `Hai @${u.split`@`[0]}

⎙─➤ *👤USERNAME* : ${user.username}
⎙─➤ *🔐PASSWORD* : ${password}
⎙─➤ *🌐LOGIN* : ${domain}
⎙─➤ *😎PEMILIK SERVER* : *MiMiXd Solo*


*YOUTUBE OWNER :*
https://youtube.com/@MiMiXdSolo

*GRUP OWNER :*
https://chat.whatsapp.com/GbWXaXcNdOCFjeH5XEqnTT

NOTE:
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================
`
MiMiXdSolo.sendMessage(u,{image: {url: akunlo}, caption: ctf }, { quoted: MiMiXdSolo.chat })
let data2 = await f2.json();
let startup_cmd = data2.attributes.startup

let f3 = await fetch(domain + "/api/application/servers", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
},
"body": JSON.stringify({
"name": name,
"description": " ",
"user": user.id,
"egg": parseInt(egg),
"docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
"startup": startup_cmd,
"environment": {
"INST": "npm",
"USER_UPLOAD": "0",
"AUTO_UPDATE": "0",
"CMD_RUN": "npm start"
},
"limits": {
"memory": memo,
"swap": 0,
"disk": disk,
"io": 500,
"cpu": cpu
},
"feature_limits": {
"databases": 5,
"backups": 5,
"allocations": 1
},
deploy: {
locations: [parseInt(loc)],
dedicated_ip: false,
port_range: [],
},
})
})
let res = await f3.json()
if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
let server = res.attributes
let p = await m.reply(`
*SUCCESSFULLY ADD USER + SERVER*
TYPE: user
ID: ${user.id}
NAME: ${user.first_name} ${user.last_name}
MEMORY: ${server.limits.memory === 0 ? 'Unlimited' : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? 'Unlimited' : server.limits.disk} MB
CPU: ${server.limits.cpu}%

`)}
break         

 case "rsm":
if (!isCreator) return        
m.reply(`Request Data SMTP
| - Username : 
| - PassWord : `)
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
        
case "rs":
if (!isCreator) return        
m.reply(`Request Data Server
| - Link : 
| - Username : 
| - PassWord : `)
break           

case "d":
if (!isCreator) return
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
case "dv":
if (!isCreator) return
let lee = text.split(',');
if (lee.length < 2) return m.reply(`ketik d item,harga`)
let kow1 = lee[0];
let kow2 = lee[1];
txtd = `INI ADALAH DATA VPS MU

📡 IP ADDRES : ${kow1}
👤 USER: root
🔑 PASS : ${kow2} 
Terima Kasih Sudah Berbelanja Di MiMiXd Solo`
m.reply(txtd)
break       
case 'pay':case 'listpay': case 'bayar': {
m.reply(`[ *Payment* ]
| - .dana
| - .gopay
| - .qris`)
}
break
case 'qris':
qr1 = "https://telegra.ph/file/dcec909d53e2f68b3e4ac.jpg" 
ctf = `CARA TRANSFER
masuk ke apk dana/gopay/ovo/dll
lalu pilih menu scan dan scan qriss ini`
MiMiXdSolo.sendMessage(from,{image: {url: qr1}, caption: ctf }, { quoted: MiMiXdSolo.chat })
break
case 'dana':
m.reply(global.danapayment)
break
case "gopay":
 m.reply(global.gopaypayment)
 break
 //group


case "assalamualaikum":case "asalamualaikum":case "lamlaikum":case "samlikum":
if (isGroup) return
 m.reply(`waalaikumsalam`)
break
// tools

case "setpp": {
if (!isCreator) return 
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

HARGA = 10K

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