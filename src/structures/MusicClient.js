const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { LavasfyClient } = require("lavasfy");
const { Manager } = require("erela.js");
const deezer = require("erela.js-deezer");
const apple = require("erela.js-apple");
const facebook = require("erela.js-facebook");
const mongoose = require('mongoose');
require("./PlayerBase"); 

class MusicBot extends Client {
	constructor() {
		super({
				shards: "auto",
				allowedMentions: {
					parse: ["roles", "users", "everyone"],
					repliedUser: false
				},
				intents: [
					GatewayIntentBits.Guilds,
					GatewayIntentBits.MessageContent,
					GatewayIntentBits.GuildVoiceStates,
					GatewayIntentBits.GuildMessages,
					GatewayIntentBits.GuildMembers,
					GatewayIntentBits.DirectMessages,
					GatewayIntentBits.GuildInvites,

				],
				partials: [
					Partials.Channel,
					Partials.Message,
					Partials.User,
					Partials.GuildMember,
				],
        });

		this.commands = new Collection();
		this.slashCommands = new Collection();
		this.config = require("../config.js");
		this.owner = this.config.ownerID;
		this.prefix = this.config.prefix;
		this.embedColor = this.config.embedColor;
		this.aliases = new Collection();
		this.commands = new Collection();
		this.logger = require("../utils/logger.js");
		if(!this.token) this.token = this.config.token;

		const dbOptions = {
			useNewUrlParser: true,
			autoIndex: false,
			connectTimeoutMS: 10000,
			family: 4,
			useUnifiedTopology: true,
		};

		mongoose.connect(this.config.mongourl, dbOptions);
		mongoose.Promise = global.Promise;

		mongoose.connection.on('connected', () => {
			this.logger.log('[DB] DATABASE CONNECTED', "ready");
		});

		mongoose.connection.on('err', (err) => {
			console.log(`[DB] Mongoose connection error: \n ${err.stack}`, "error");
		});
		mongoose.connection.on('disconnected', () => {
			console.log('[DB] Mongoose disconnected');
		});
        	
		const client = this;

		this.Lavasfy = new LavasfyClient(
			{
				clientID: this.config.SpotifyID,
				clientSecret: this.config.SpotifySecret,
				playlistPageLoadLimit: 4,
				filterAudioOnlyResult: true,
				autoResolve: true,
				useSpotifyMetadata: true,
			},

			[
				{
					id: this.config.nodes.id,
					host: this.config.nodes.host,
					port: this.config.nodes.port,
					password: this.config.nodes.password,
					secure: this.config.nodes.secure,
				},
			]
		);

		this.manager = new Manager({
			plugins: [
				new deezer(),
				new apple(),
				new facebook(),
			],
			nodes: [
				{
					identifier: this.config.nodes.id,
					host: this.config.nodes.host,
					port: this.config.nodes.port,
					password: this.config.nodes.password,
					secure: this.config.nodes.secure,
				},
			],
			send(id, payload) {
				const guild = client.guilds.cache.get(id);
				if (guild) guild.shard.send(payload);
			},
		});
		  
		["error", "commands", "slashCommand", "events"].forEach((handler) => {
			require(`../handlers/${handler}`)(this);
		});
	}

	connect() {
    	return super.login(this.token);
    };
};

module.exports = MusicBot;