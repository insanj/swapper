
function tigonYAMLFormSubmit() {
    const yamlString = document.getElementById("tigon-form-input").value;
    const yamlJSON = YAML.parse(yamlString);
    let convertedJSON = {};
    for (let toplevelKey in yamlJSON) {
        if (toplevelKey !== "worlds") {
            convertedJSON[toplevelKey] = yamlJSON[toplevelKey];
        } else {
            let worlds = yamlJSON[toplevelKey];
            let parsedWorlds = {};
            for (let worldUIDString in worlds) {
                let areas = worlds[worldUIDString];
                let parsedAreas = {};
                for (let areaName in areas) {
                    let areaLoctionString = areas[areaName];
                    const splitCoords = areaLoctionString.split(',');
                    parsedAreas[areaName] = {
                        "x": parseFloat(splitCoords[0]),
                        "y": parseFloat(splitCoords[1]),
                        "z": parseFloat(splitCoords[2])
                    };
                }
                parsedWorlds[worldUIDString] = parsedAreas;
            }
            convertedJSON[toplevelKey] = parsedWorlds;
        }
    }

    console.log("Parsing back into YAML..." + JSON.stringify(convertedJSON, null, '\t'));
    const yamlConvertedJSON = YAML.stringify(convertedJSON, 20, 2).replace("\n","<br>");
    document.getElementById("tigon-result").innerHTML = yamlConvertedJSON;
}

function tigonJSONFormSubmit() {
    const yamlString = document.getElementById("tigon-form-input").value;
    const yamlJSON = YAML.parse(yamlString);
    console.log("Dumping JSON instead of YAML..." + JSON.stringify(yamlJSON, null, '\t'));
    document.getElementById("tigon-result").innerHTML = JSON.stringify(yamlJSON);
}

function tigonNBTFormSubmit() {
  const yamlString = document.getElementById("tigon-form-input").value;
  const yamlJSON = YAML.parse(yamlString);

  let nbtWorldsCompoundTag = {};
  for (let worldUUID in yamlJSON["worlds"]) {
    const worldAreas = yamlJSON["worlds"][worldUUID];
    let worldCompoundTag = {};
    for (let areaName in worldAreas) {
      const area = worldAreas[areaName];
      worldCompoundTag[areaName] = {
        type: 'compound', value: {
          x: { type: 'double', value: area["x"] },
          y: { type: 'double', value: area["y"] },
          z: { type: 'double', value: area["z"] }
        }
      };
    }

    nbtWorldsCompoundTag[worldUUID] = {
      type: 'compound', value: worldCompoundTag
    };
  }

  const nbtRootCompoundTag = {
      name: 'ViridianPersistentState',
      value: {
        DataVersion: {
          type: 'int', value: 1935
        },
        data: {
          type: 'compound', value: {
            pride_worlds: {
              type: 'compound', value: nbtWorldsCompoundTag
            }
          }
        }
      }
  };

  console.log("Translated YAML to NBT root compound tag: " + JSON.stringify(nbtRootCompoundTag));
  const nbtArrayBuffer = nbt.writeUncompressed(nbtRootCompoundTag);

  const nbtBytesArray = new Uint8Array(nbtArrayBuffer);
  var blob = new Blob([nbtBytesArray], {type: "application/nbt"});
  var link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  var fileName = 'ViridianPersistentState.dat';
  link.download = fileName;
  link.click();

//  document.getElementById("tigon-iframe").src = yamlConvertedJSON;
}

document.getElementById("tigon-form-submit").onclick = function(event) {
    event.preventDefault();

    if (window.location.href.indexOf('json') >= 0) {
      tigonJSONFormSubmit();
    } else if (window.location.href.indexOf('yaml') >= 0) {
      tigonYAMLFormSubmit();
    } else {
      tigonNBTFormSubmit();
    }
};

document.addEventListener('DOMContentLoaded', function(){
  if (window.location.href.indexOf('json') >= 0) {
    document.getElementById("tigon-form-input").setAttribute("placeholder", "YAML -> JSON");
  } else if (window.location.href.indexOf('yaml') >= 0) {
    document.getElementById("tigon-form-input").setAttribute("placeholder", "0.3.x YAML -> 0.4.x YAML");
  } else {
    document.getElementById("tigon-form-input").setAttribute("placeholder", "YAML -> NBT");
  }
}, false);
