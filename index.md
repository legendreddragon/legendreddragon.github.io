---
title: Home
layout: home
nav_order: 0
---
# Legend Of the Red Dragon  
{: .homeh1 .no_toc } 
![](assets/images/slider2.webp){: .mt-5 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## About
Legend Of the Red Dragon is a <a href="https://en.wikipedia.org/wiki/Door_(bulletin_board_system)" target="_blank">BBS 'Door' Game</a> that became very popular in the early internet stages at the 90s. It could be said that it was a popular role-playing online game before the internet even existed (or was open).  
  
<a href="https://en.wikipedia.org/wiki/Bulletin_board_system" target="_blank">Dial up BBS's</a> were the public's main connection to the online world with message forums, ANSI art galleries, downloadable files, and of course, games.  
  
This wiki focuses on the modern browser-based version of <a href="https://legendreddragon.net/" target="_blank">LoRD hosted on Gearhost</a>, which is a successor to the <a href="https://nuklearlord.fandom.com/wiki/Special:AllPages" target="_blank">NuKlear LoRD</a> version.  

## NuKlear LoRD
Nuklear Lord, built in the year 2000, was meant to demonstrate the possibility of running MS-DOS based BBS software on a modern Linux system under the DOS Emulator. Its popularity grew rapidly, and Nuklear LORD hosted a strong community of dedicated LORD players for almost two decades.  
  
After a slow but steady decline, Nuklear LoRD went down in early 2019.  

## legendreddragon.net  
Also called `Gear LoRD`, or `LoRD Gearhost` because of the hosting provider, <a href="https://www.gearhost.com/" target="_blank">Gearhost</a>.  
  
The game is very similar to Nuklear, with five realms with slightly different rules.

### The Realms

|:-----:|:------|
| [Eternal](https://legendreddragon.net/Realm/Eternal){: .realm-button .btn .btn-purple } | Same as River, but you can choose to keep playing your current game even when a realm restarts |
| [River](https://legendreddragon.net/Realm/River){: .realm-button .btn .btn-blue } | Free use of weapons and armour regardless of level (camping allowed), no online battles without prior agreement |
| [Forest](https://legendreddragon.net/Realm/Forest){: .realm-button .btn .btn-green } | Weapons restricted to certain levels, no online battles without prior agreement, camping prevention |
| [Fire](https://legendreddragon.net/Realm/Fire){: .realm-button .btn .btn-red } | Same as Forest, but there is no option to decline online battles |
| [Mist](https://legendreddragon.net/Realm/Mist){: .realm-button .btn .btn-gray } | Same as Forest, but stats outside the game are delayed one day |
{: .realms-table }

### History
Around 2013 a rewrite was created by The Mystical One (co-sysop of Nuklear Lord). It fixed many of the bugs in LoRD and allowed the game to be customized. It allowed the server (written in C#) to run on a Linux VM under mono. Users would be able to run the client directly, or connect to a hosted client on the Linux VM via telnet. Unfortunately the project slowly died.  
  
As player numbers declined at Nuklear Lord there was talk in the forums about the future of the site. In early 2019 Nuklear Lord went offline.  
  
### The Rewrite
It is a rewrite of the work done by The Mystical One, a lot of credit goes to Matt as it wouldn't have been possible without his work. This web based version was rewritten to be connectionless, with a database backend and an ajax frontend. Special care was taken to make it as close to the original 4.00a experience as possible. 

### Improvements
 - Death knight skill damage has been boosted from 3x to 3.3x.
 - Rounds automatically reset at midnight when the round has been won.
 - Players can not engage in battle with another player who is already in battle. (double kill fix)
 - Players cannot enter the realm while engaged in an offline battle with another player. (player left alive fix)
 - Online duel battle look and feel has been made consistent with offline battles.
 - Dwarf blackjack event removed from the forest.
 - Background colours can no longer be used in the flower garden.
 - Blank messages are now cancelled rather than sending a default message.
 - Ability to block other players. (harassment prevention)
 - A new day event will occur for 1 minute at midnight to allow maintenance to run.
 - Level 1 monsters removed from the forest in higher levels.
 - Horse death does 7500 hp damage to the dragon. (early horse kill prevention)
 - Inactive players will be resurrected at random times during the day rather than at the start of the day. (timezone advantage prevention)
 - Announcements limited to one line, two per person per day, with a max of ten announcements in the news per day. (spam prevention)
 - Players are hidden rather than deleted after 7 days of inactivity. When married, your loved one will be declared missing but both players will not lose any charm. The player is unhidden when they next play.
 - Inactivity timeout increased from 5 to 15 minutes.
 - Forest monster surprise powermove disabled.
 - Npc bar chatter probability decreased from 0.5 to 0.25.
 - Urls posted in mail, bar, etc are clickable.


### Cheat prevention
 - Gold gained is limited to one quarter of the average forest fight gold when killing a player. Enemy player still loses all gold on hand.
 - Gems gained is limited to one when killing a player. Enemy player still loses half of their gems.
 - Gold gained is limited to 5000 gold per day from bank transfers, the limit is reset when the player enters the realm on a new day or when they kill the dragon.
 - New accounts cannot be created while using a proxy, vpn or tor to prevent one person hiding their ip address in order to create multiple accounts.
 - Players who have used the same ip address in the last month are barred from attacking, transferring gold, or sending romantic mail to each other.

### Rules
 - One account per person.
 - No team play. eg. using multiple accounts to gain player info, exp, gold, gems or lays.
 - Be kind. No hate speech or harrassing other players.
 - The game contains adult themes but please keep your personal fantasies private.

