#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (prompt) => new Promise((resolve) => rl.question(prompt, resolve));

class VoiceCloningConfig {
  constructor() {
    this.configPath = path.join(__dirname, '../../.env.local');
    this.voiceConfigPath = path.join(__dirname, 'voice-config.json');
  }

  async setup() {
    console.log('🎤 Voice Cloning Setup for Ian Derrington Blog');
    console.log('================================================\n');

    // Check existing config
    const existingConfig = this.loadExistingConfig();
    
    console.log('Available Voice Cloning Services:');
    console.log('1. ElevenLabs (Recommended - High quality, free tier)');
    console.log('2. Speechify (30-second cloning, free tier)');
    console.log('3. AudioStack (Professional grade)');
    console.log('4. Resemble AI (Real-time conversion)\n');

    const service = await question('Choose service (1-4): ');
    
    let config = {};
    
    switch(service) {
      case '1':
        config = await this.setupElevenLabs();
        break;
      case '2':
        config = await this.setupSpeechify();
        break;
      case '3':
        config = await this.setupAudioStack();
        break;
      case '4':
        config = await this.setupResembleAI();
        break;
      default:
        console.log('Invalid selection. Defaulting to ElevenLabs...');
        config = await this.setupElevenLabs();
    }

    // Save configuration
    await this.saveConfig(config);
    
    console.log('\n✅ Voice cloning setup complete!');
    console.log('📁 Configuration saved to:', this.voiceConfigPath);
    console.log('🔑 API keys saved to:', this.configPath);
    
    rl.close();
  }

  async setupElevenLabs() {
    console.log('\n🔧 Setting up ElevenLabs...');
    console.log('Visit: https://elevenlabs.io/app/speech-synthesis');
    
    const apiKey = await question('Enter your ElevenLabs API key: ');
    
    // Add to .env.local
    this.addToEnv('ELEVENLABS_API_KEY', apiKey);
    
    return {
      service: 'elevenlabs',
      apiKey: apiKey,
      baseUrl: 'https://api.elevenlabs.io/v1',
      features: {
        voiceCloning: true,
        realTimeStreaming: true,
        multiLanguage: true,
        emotionalRange: 'high',
        freeCredits: 10000 // characters per month
      },
      pricing: {
        free: '10,000 characters/month',
        starter: '$5/month - 30,000 characters',
        creator: '$22/month - 100,000 characters'
      }
    };
  }

  async setupSpeechify() {
    console.log('\n🔧 Setting up Speechify...');
    console.log('Visit: https://speechify.com/voice-cloning');
    
    const apiKey = await question('Enter your Speechify API key: ');
    
    this.addToEnv('SPEECHIFY_API_KEY', apiKey);
    
    return {
      service: 'speechify',
      apiKey: apiKey,
      baseUrl: 'https://api.speechify.com/v1',
      features: {
        voiceCloning: true,
        quickCloning: '30 seconds',
        realTimeStreaming: false,
        multiLanguage: true,
        emotionalRange: 'medium'
      }
    };
  }

  async setupAudioStack() {
    console.log('\n🔧 Setting up AudioStack...');
    console.log('Visit: https://audiostack.ai/');
    
    const apiKey = await question('Enter your AudioStack API key: ');
    
    this.addToEnv('AUDIOSTACK_API_KEY', apiKey);
    
    return {
      service: 'audiostack',
      apiKey: apiKey,
      baseUrl: 'https://v2.api.audio',
      features: {
        voiceCloning: true,
        professionalGrade: true,
        batchProcessing: true,
        multiLanguage: true,
        emotionalRange: 'high'
      }
    };
  }

  async setupResembleAI() {
    console.log('\n🔧 Setting up Resemble AI...');
    console.log('Visit: https://www.resemble.ai/');
    
    const apiKey = await question('Enter your Resemble AI API key: ');
    
    this.addToEnv('RESEMBLE_API_KEY', apiKey);
    
    return {
      service: 'resemble',
      apiKey: apiKey,
      baseUrl: 'https://app.resemble.ai/api/v2',
      features: {
        voiceCloning: true,
        realTimeConversion: true,
        speechToSpeech: true,
        multiLanguage: true,
        emotionalRange: 'high'
      }
    };
  }

  loadExistingConfig() {
    try {
      if (fs.existsSync(this.voiceConfigPath)) {
        return JSON.parse(fs.readFileSync(this.voiceConfigPath, 'utf8'));
      }
    } catch (error) {
      console.warn('Could not load existing config:', error.message);
    }
    return null;
  }

  addToEnv(key, value) {
    let envContent = '';
    
    if (fs.existsSync(this.configPath)) {
      envContent = fs.readFileSync(this.configPath, 'utf8');
    }
    
    // Check if key already exists
    const keyRegex = new RegExp(`^${key}=.*$`, 'm');
    if (keyRegex.test(envContent)) {
      // Replace existing key
      envContent = envContent.replace(keyRegex, `${key}=${value}`);
    } else {
      // Add new key
      envContent += `\n${key}=${value}`;
    }
    
    fs.writeFileSync(this.configPath, envContent);
  }

  async saveConfig(config) {
    // Ensure directory exists
    const dir = path.dirname(this.voiceConfigPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Add metadata
    config.setupDate = new Date().toISOString();
    config.version = '1.0.0';
    
    fs.writeFileSync(this.voiceConfigPath, JSON.stringify(config, null, 2));
  }
}

// Run setup if called directly
if (require.main === module) {
  const setup = new VoiceCloningConfig();
  setup.setup().catch(console.error);
}

module.exports = VoiceCloningConfig; 