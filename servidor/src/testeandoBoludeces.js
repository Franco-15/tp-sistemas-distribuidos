
    const animals = { // lo que me llega de mqtt
    checkpointID: "12345-abcde",
    animals: [
      { id: '11:5e:e7:84:c4:f6', rssi: -50 },
      { id: '7c:0a:3f:83:db:93', rssi: -62 },
      { id: 'c2:5a:3d:ae:10:28', rssi: -73 }
    ]
    };

  
  
    const allAnimals = {
    "11:5e:e7:84:c4:f6": { name: "Animal 1", species: "Dog" },
    "7c:0a:3f:83:db:93": { name: "Animal 2", species: "Cat" },
    "c2:5a:3d:ae:10:28": { name: "Animal 3", species: "Horse" },
    "9f:4b:3a:17:5e:12": { name: "Animal 4", species: "Cow" }
    };
  
  //Habria que filtrar del listado del checkpoint que animales se encuentran en el json y que "animales" son un pendejo con un Nokia    
    animals.animals.forEach(animal => {
      if (allAnimals[animal.id]) { //desp hay que adaptar esto, esta re gpt 
        console.log(`Animal ID ${animal.id} encontrado en allAnimals:`, allAnimals[animal.id]); //para mi aca no habria que hacer nada, si 
      } else {
        console.log(`Animal ID ${animal.id} no encontrado en allAnimals`);
      }
    });