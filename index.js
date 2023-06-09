const os = require('node:os');
const fs = require('fs');
const crypto = require('node:crypto');
const colors = require('colors');

function key_os(){
	// Caminho para o dispositivo de bloco (HD)
	const devicePath = 'C:';

	// Verifica se o dispositivo existe
	fs.access(devicePath, fs.constants.F_OK, (err) => {
	  if (err) {
	    console.error('O dispositivo não existe:', err);
	    return;
	  }

	  // Obtém as estatísticas do dispositivo
	  fs.stat(devicePath, (err, stats) => {
	    if (err) {
	      console.error('Erro ao obter as estatísticas do dispositivo:', err);
	      return;
	    }
	    
	    const cpu = os.cpus();
	    
	    const username = os.userInfo().username;
	    const osType = os.type();
	    const nucleos =  cpu.length;
		const model = cpu[0].model;
		const inode = stats.ino;
		const release = os.release();
		const plataform = os.platform();
		const machine = os.machine()
		const memoria = os.totalmem();
		//key do usuario
		
		const keyUserMD5 = `${crypto.createHash('md5').update(username).digest('hex')}${crypto.createHash('md5').update(osType).digest('hex')}${crypto.createHash('md5').update(`core:${nucleos}`).digest('hex')}${crypto.createHash('md5').update(`${model}`).digest('hex')}${crypto.createHash('md5').update(`uid:${inode}`).digest('hex')}${crypto.createHash('md5').update(release).digest('hex')}${crypto.createHash('md5').update(plataform).digest('hex')}${crypto.createHash('md5').update(machine).digest('hex')}${crypto.createHash('md5').update(`memoria:${memoria}`).digest('hex')}`;
		
		console.log("MD5: ",`${keyUserMD5}`.blue);
		console.log()
		const KeyUserBase64 = Buffer.from(keyUserMD5).toString('base64');
		console.log("BASE64:",` ${KeyUserBase64}`.green)
	  });
	});
}

key_os();