var enemy = {
	monsterList: {},
	joustmite: {
		name: "Joustmite",
		display: "<^)",
		hp: 1000,
		attack: 3,
		status: "rock",
		halfAtk: "",
		special: ""
	},
	slooch: {
		name: "Pyroclasmic Slooch",
		display: "/\\~",
		hp: 1000,
		attack: 4,
		status: "",
		halfAtk: "red",
		special: ""
	},
	blowhog: {
		name: "Fiery Blowhog",
		display: "-{}",
		hp: 1000,
		attack: 6,
		status: "fire",
		halfAtk: "",
		special: ""
	},
	amprat: {
		name: "Bearded Amprat",
		display: "m()",
		hp: 1500,
		attack: 6,
		status: "",
		halfAtk: "yellow",
		special: ""
	},
	anodeBeetle: {
		name: "Anode Beetle",
		display: "nHn",
		hp: 500,
		attack: 100,
		status: "electric",
		halfAtk: "",
		special: ""
	},
	electricWall: {
		name: "Electric Gate",
		display: "NMN",
		hp: 10000,
		attack: 100,
		status: "electric",
		halfAtk: "",
		special: ""
	},
	rockWall: {
		name: "Reinforced Wall",
		display: "|||",
		hp: 3000,
		attack: 0,
		status: "",
		halfAtk: "",
		special: "bomb"
	},
	dirtWall: {
		name: "Dirt Wall",
		display: "Y#Y",
		hp: 10000,
		attack: 0,
		status: "",
		halfAtk: "",
		special: ""
	},
	basicWall: {
		name: "Bramble Wall",
		display: "TXT",
		hp: 10000,
		attack: 0,
		status: "",
		halfAtk: "",
		special: ""
	},
	bulborb: {
		name: "Bulborb",
		display: ">%%",
		hp: 700,
		attack: 3,
		status: "",
		halfAtk: "",
		special: ""
	}
};