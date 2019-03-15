
function swapper_singleplayerToMultiplayer(playerUUID, levelDatFile) {
  const reader = new FileReader();
  reader.onerror = error => reject(error);
  reader.onload = event => {
     // take level.dat, Player entry and fill in a new compound tag
     const compressedNBTData = event.target.result;
     const uncompressedNBTData = pako.inflate(compressedNBTData);
     nbt.parse(uncompressedNBTData, function(error, data) {
         // grab the Player tag from the level dat (nested inside level.dat > Data > Player)
         let levelDatPlayerTag = data.value['Data'].value['Player'];
         levelDatPlayerTag.name = playerUUID;

         // write new compound tag to the final file buffer
         const nbtArrayBuffer = nbt.writeUncompressed(levelDatPlayerTag);

         // download file
         const nbtBytesArray = new Uint8Array(nbtArrayBuffer);
         var blob = new Blob([nbtBytesArray], {type: "application/nbt"});
         var link = document.createElement('a');
         link.href = window.URL.createObjectURL(blob);
         var fileName = playerUUID + ".dat";
         link.download = fileName;
         link.click();
     });
  }
  reader.readAsArrayBuffer(levelDatFile);
}

function swapper_multiplayerToSingleplayer(uuidDatFile, levelDatFile) {
  // parse both UUID.dat and level.dat
  nbt.parse(uuidDatFile, function(error, uuidData) {
    nbt.parse(levelDatFile, function(error, levelData) {
      // grab the root level tag from the uuid file
      const uuidPlayerTag = uuidData.value;

      // write this tag as "Player" in the level.dat file, nested under leveldat > Data > Player
      levelData.value['Data'].value['Player'].value = uuidPlayerTag;

      // write new compound tag to the final file buffer
      const nbtArrayBuffer = nbt.writeUncompressed(levelData);

      // download file
      const nbtBytesArray = new Uint8Array(nbtArrayBuffer);
      var blob = new Blob([nbtBytesArray], {type: "application/nbt"});
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      var fileName = levelDatFile + ".dat";
      link.download = fileName;
      link.click();
    });
  });
}

document.getElementById("single-to-multi-submit").onclick = function(event) {
    event.preventDefault();

    try {
      const playerUUID = document.getElementById("single-to-multi-text-input").value;
      const levelDatFile = document.getElementById("single-to-multi-file").files[0];
      swapper_singleplayerToMultiplayer(playerUUID, levelDatFile);
    } catch (e) {
      alert(e);
    }
};

document.getElementById("multi-to-single-submit").onclick = function(event) {
    event.preventDefault();

    try {
      const uuidFile = document.getElementById("multi-to-single-uuid-file").files[0];
      const levelDatFile = document.getElementById("multi-to-single-level-file").files[0];
      swapper_multiplayerToSingleplayer(uuidFile, levelDatFile);
    } catch (e) {
      alert(e);
    }
};
