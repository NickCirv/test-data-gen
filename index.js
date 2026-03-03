#!/usr/bin/env node
import { randomBytes, randomUUID } from 'crypto';
import { readFileSync } from 'fs';
import { createInterface } from 'readline';

// ─── DATA TABLES ────────────────────────────────────────────────────────────

const FIRST_NAMES = [
  'James','John','Robert','Michael','William','David','Richard','Joseph','Thomas','Charles',
  'Mary','Patricia','Jennifer','Linda','Barbara','Elizabeth','Susan','Jessica','Sarah','Karen',
  'Christopher','Daniel','Matthew','Anthony','Mark','Donald','Steven','Paul','Andrew','Joshua',
  'Kevin','Brian','George','Edward','Ronald','Timothy','Jason','Jeffrey','Ryan','Jacob',
  'Emily','Amanda','Melissa','Deborah','Dorothy','Lisa','Nancy','Sandra','Carol','Betty',
  'Margaret','Ashley','Dorothy','Kimberly','Donna','Michelle','Helen','Maria','Amy','Rebecca',
  'Olivia','Emma','Sophia','Charlotte','Ava','Isabella','Mia','Evelyn','Harper','Luna',
  'Liam','Noah','Oliver','Elijah','Benjamin','Lucas','Henry','Alexander','Mason','Ethan',
  'Aiden','Logan','Jackson','Sebastian','Mateo','Jack','Owen','Theodore','Amir','Caleb',
  'Wei','Ming','Yan','Feng','Lei','Hui','Jing','Yang','Xin','Chen',
  'Priya','Ananya','Deepa','Kavya','Meera','Nisha','Pooja','Riya','Shreya','Sita',
  'Mohammed','Omar','Ali','Hassan','Ahmed','Ibrahim','Khalid','Tariq','Yusuf','Hamza',
  'Sofia','Isabella','Valentina','Camila','Lucia','Martina','Elena','Diana','Sara','Ana',
  'Hiroshi','Kenji','Takashi','Yuki','Naomi','Sakura','Haruto','Ren','Sora','Aoi',
  'Carlos','Luis','Miguel','Pedro','Juan','Diego','Alejandro','Rafael','Sergio','Eduardo',
  'Fatima','Zara','Layla','Nour','Yasmine','Amira','Hana','Dina','Rania','Salma',
  'Grace','Faith','Hope','Joy','Rose','Jade','Ruby','Pearl','Dawn','Faye',
  'Tyler','Cody','Dustin','Travis','Blake','Chase','Drake','Rhys','Finn','Kai',
  'Ella','Zoe','Lily','Chloe','Avery','Nora','Hannah','Hazel','Violet','Aurora',
];

const LAST_NAMES = [
  'Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez',
  'Hernandez','Lopez','Gonzalez','Wilson','Anderson','Thomas','Taylor','Moore','Jackson','Martin',
  'Lee','Perez','Thompson','White','Harris','Sanchez','Clark','Ramirez','Lewis','Robinson',
  'Walker','Young','Allen','King','Wright','Scott','Torres','Nguyen','Hill','Flores',
  'Green','Adams','Nelson','Baker','Hall','Rivera','Campbell','Mitchell','Carter','Roberts',
  'Turner','Phillips','Evans','Collins','Stewart','Sanchez','Morris','Rogers','Reed','Cook',
  'Morgan','Bell','Murphy','Bailey','Cooper','Richardson','Cox','Howard','Ward','Torres',
  'Peterson','Gray','Ramirez','James','Watson','Brooks','Kelly','Sanders','Price','Bennett',
  'Wood','Barnes','Ross','Henderson','Coleman','Jenkins','Perry','Powell','Long','Patterson',
  'Hughes','Flores','Washington','Butler','Simmons','Foster','Gonzales','Bryant','Alexander','Russell',
  'Griffin','Diaz','Hayes','Myers','Ford','Hamilton','Graham','Sullivan','Wallace','Woods',
  'West','Cole','Jordan','Owens','Reynolds','Fisher','Ellis','Harrison','Gibson','Mcdonald',
  'Cruz','Marshall','Ortiz','Gomez','Murray','Freeman','Wells','Webb','Simpson','Stevens',
  'Tucker','Porter','Hunter','Hicks','Crawford','Henry','Boyd','Mason','Morales','Kennedy',
  'Warren','Dixon','Ramos','Reyes','Burns','Gordon','Shaw','Holmes','Rice','Robertson',
];

const CITIES = [
  { city: 'New York', state: 'NY', zip: '10001' },
  { city: 'Los Angeles', state: 'CA', zip: '90001' },
  { city: 'Chicago', state: 'IL', zip: '60601' },
  { city: 'Houston', state: 'TX', zip: '77001' },
  { city: 'Phoenix', state: 'AZ', zip: '85001' },
  { city: 'Philadelphia', state: 'PA', zip: '19101' },
  { city: 'San Antonio', state: 'TX', zip: '78201' },
  { city: 'San Diego', state: 'CA', zip: '92101' },
  { city: 'Dallas', state: 'TX', zip: '75201' },
  { city: 'San Jose', state: 'CA', zip: '95101' },
  { city: 'Austin', state: 'TX', zip: '73301' },
  { city: 'Jacksonville', state: 'FL', zip: '32099' },
  { city: 'Fort Worth', state: 'TX', zip: '76101' },
  { city: 'Columbus', state: 'OH', zip: '43085' },
  { city: 'Charlotte', state: 'NC', zip: '28201' },
  { city: 'Indianapolis', state: 'IN', zip: '46201' },
  { city: 'San Francisco', state: 'CA', zip: '94101' },
  { city: 'Seattle', state: 'WA', zip: '98101' },
  { city: 'Denver', state: 'CO', zip: '80201' },
  { city: 'Nashville', state: 'TN', zip: '37201' },
  { city: 'Oklahoma City', state: 'OK', zip: '73101' },
  { city: 'El Paso', state: 'TX', zip: '79901' },
  { city: 'Washington', state: 'DC', zip: '20001' },
  { city: 'Las Vegas', state: 'NV', zip: '88901' },
  { city: 'Louisville', state: 'KY', zip: '40201' },
  { city: 'Memphis', state: 'TN', zip: '37501' },
  { city: 'Portland', state: 'OR', zip: '97201' },
  { city: 'Baltimore', state: 'MD', zip: '21201' },
  { city: 'Milwaukee', state: 'WI', zip: '53201' },
  { city: 'Albuquerque', state: 'NM', zip: '87101' },
  { city: 'Tucson', state: 'AZ', zip: '85701' },
  { city: 'Fresno', state: 'CA', zip: '93701' },
  { city: 'Sacramento', state: 'CA', zip: '94201' },
  { city: 'Mesa', state: 'AZ', zip: '85201' },
  { city: 'Kansas City', state: 'MO', zip: '64101' },
  { city: 'Atlanta', state: 'GA', zip: '30301' },
  { city: 'Omaha', state: 'NE', zip: '68101' },
  { city: 'Colorado Springs', state: 'CO', zip: '80901' },
  { city: 'Raleigh', state: 'NC', zip: '27601' },
  { city: 'Minneapolis', state: 'MN', zip: '55401' },
  { city: 'Cleveland', state: 'OH', zip: '44101' },
  { city: 'Wichita', state: 'KS', zip: '67201' },
  { city: 'Arlington', state: 'TX', zip: '76001' },
  { city: 'Bakersfield', state: 'CA', zip: '93301' },
  { city: 'New Orleans', state: 'LA', zip: '70112' },
  { city: 'Tampa', state: 'FL', zip: '33601' },
  { city: 'Aurora', state: 'CO', zip: '80010' },
  { city: 'Anaheim', state: 'CA', zip: '92801' },
  { city: 'Santa Ana', state: 'CA', zip: '92701' },
  { city: 'Corpus Christi', state: 'TX', zip: '78401' },
  { city: 'Riverside', state: 'CA', zip: '92501' },
];

const STREET_TEMPLATES = [
  'Main St', 'Oak Ave', 'Maple Dr', 'Cedar Ln', 'Pine St', 'Elm St', 'Washington Blvd',
  'Park Ave', 'Lake Rd', 'Hill Dr', 'River Rd', 'Forest Way', 'Sunset Blvd', 'Broadway',
  'Highland Ave', 'Meadow Ln', 'Valley Rd', 'Summit Dr', 'Willow St', 'Birch Ct',
];

const EMAIL_DOMAINS = [
  'example.com', 'test.io', 'testmail.com', 'sample.org', 'demo.net',
  'placeholder.dev', 'testdomain.com', 'example.org', 'test.example', 'mockmail.io',
  'fakeemail.net', 'testuser.com', 'devtest.io', 'sandbox.example', 'qa.test',
];

const WORDS = [
  'the','quick','brown','fox','jumps','over','lazy','dog','pack','my','box','with','five',
  'dozen','liquor','jugs','how','vexingly','quick','daft','zebras','sphinx','quartz',
  'vivid','waxy','blaze','jobs','glare','bright','flux','crisp','damp','glow','haze',
  'calm','bold','keen','vast','pure','dark','soft','warm','cool','deep','high','wide',
  'fast','slow','long','near','loud','safe','live','move','grow','stop','turn','find',
  'make','take','give','know','think','look','see','want','use','get','set','put',
  'red','blue','green','orange','purple','yellow','pink','black','white','grey',
  'time','year','way','day','man','world','life','hand','part','place','case','week',
  'company','system','program','question','government','night','point','home','water',
  'room','mother','area','money','story','fact','month','lot','right','study','book',
];

// ─── SEEDED PRNG (LCG) ──────────────────────────────────────────────────────

class SeededRNG {
  constructor(seed) {
    // LCG parameters (Knuth)
    this.a = 1664525;
    this.c = 1013904223;
    this.m = 2 ** 32;
    this.state = (seed >>> 0);
  }

  next() {
    this.state = ((this.a * this.state + this.c) >>> 0);
    return this.state / this.m;
  }

  nextInt(min, max) {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  pick(arr) {
    return arr[this.nextInt(0, arr.length - 1)];
  }

  nextBytes(n) {
    const buf = [];
    for (let i = 0; i < n; i++) {
      buf.push(this.nextInt(0, 255));
    }
    return buf;
  }
}

let rng;

function initRNG(seed) {
  if (seed !== undefined) {
    rng = new SeededRNG(Number(seed));
  } else {
    const s = randomBytes(4).readUInt32BE(0);
    rng = new SeededRNG(s);
  }
}

// ─── GENERATORS ─────────────────────────────────────────────────────────────

function genUUID() {
  if (rng instanceof SeededRNG && rng.state !== undefined) {
    const b = rng.nextBytes(16);
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    const hex = b.map(x => x.toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
  }
  return randomUUID();
}

function genName() {
  const first = rng.pick(FIRST_NAMES);
  const last = rng.pick(LAST_NAMES);
  return { first, last, full: `${first} ${last}` };
}

function genEmail(first, last) {
  const domain = rng.pick(EMAIL_DOMAINS);
  const patterns = [
    `${first.toLowerCase()}.${last.toLowerCase()}`,
    `${first.toLowerCase()}${last.toLowerCase()}`,
    `${first.toLowerCase()[0]}${last.toLowerCase()}`,
    `${first.toLowerCase()}.${last.toLowerCase()}${rng.nextInt(1, 99)}`,
    `${first.toLowerCase()}${rng.nextInt(100, 999)}`,
  ];
  const local = rng.pick(patterns).replace(/[^a-z0-9._]/g, '');
  return `${local}@${domain}`;
}

function genPhone() {
  const area = rng.nextInt(200, 999);
  const exchange = rng.nextInt(200, 999);
  const line = rng.nextInt(1000, 9999);
  return `+1-${area}-${String(exchange).padStart(3,'0')}-${String(line).padStart(4,'0')}`;
}

function genDate(fromMs, toMs) {
  const ms = fromMs + Math.floor(rng.next() * (toMs - fromMs));
  return new Date(ms).toISOString();
}

function genAddress() {
  const num = rng.nextInt(1, 9999);
  const street = rng.pick(STREET_TEMPLATES);
  const loc = rng.pick(CITIES);
  const zipSuffix = String(rng.nextInt(0, 99)).padStart(2, '0');
  return {
    street: `${num} ${street}`,
    city: loc.city,
    state: loc.state,
    zip: `${loc.zip.slice(0, 3)}${zipSuffix}`,
  };
}

function luhn(num) {
  const digits = String(num).split('').reverse().map(Number);
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let d = digits[i];
    if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }
    sum += d;
  }
  return (10 - (sum % 10)) % 10;
}

function genCreditCard() {
  // Only known safe test BINs — Visa test prefix family
  const bins = [
    '411111111111',  // Visa test
    '400000000000',
    '400000000001',
    '400000000002',
    '412345678901',
    '413245678901',
  ];
  const bin = rng.pick(bins);
  const partial = bin + String(rng.nextInt(100, 999));
  const check = luhn(partial + '0');
  const number = partial + check;
  const mm = String(rng.nextInt(1, 12)).padStart(2, '0');
  const yy = rng.nextInt(26, 30);
  const cvv = String(rng.nextInt(100, 999));
  return {
    number,
    expiry: `${mm}/${yy}`,
    cvv,
    brand: 'Visa (test)',
  };
}

function genWord() {
  return rng.pick(WORDS);
}

function genSentence() {
  const len = rng.nextInt(4, 10);
  const words = [];
  for (let i = 0; i < len; i++) words.push(rng.pick(WORDS));
  const s = words.join(' ');
  return s.charAt(0).toUpperCase() + s.slice(1) + '.';
}

function genUser(opts = {}) {
  const fromMs = opts.from ? new Date(opts.from).getTime() : new Date('2018-01-01').getTime();
  const toMs = opts.to ? new Date(opts.to).getTime() : new Date('2025-01-01').getTime();
  const { first, last, full } = genName();
  return {
    id: genUUID(),
    name: full,
    email: genEmail(first, last),
    phone: genPhone(),
    createdAt: genDate(fromMs, toMs),
  };
}

// ─── TEMPLATE ENGINE ────────────────────────────────────────────────────────

function processTemplate(template) {
  const cache = {};
  return template.replace(/\{\{(\w+(?::\S+)?)\}\}/g, (_, token) => {
    const [type, arg] = token.split(':');
    switch (type) {
      case 'name': {
        if (!cache.name) cache.name = genName();
        return cache.name.full;
      }
      case 'email': {
        if (!cache.name) cache.name = genName();
        return genEmail(cache.name.first, cache.name.last);
      }
      case 'uuid': return genUUID();
      case 'phone': return genPhone();
      case 'date': return genDate(new Date('2018-01-01').getTime(), new Date('2025-01-01').getTime());
      case 'word': return genWord();
      case 'sentence': return genSentence();
      case 'int': {
        const [lo, hi] = (arg || '1-100').split('-').map(Number);
        return String(rng.nextInt(lo, hi));
      }
      default: return `{{${token}}}`;
    }
  });
}

// ─── JSON SCHEMA GENERATOR ──────────────────────────────────────────────────

function genFromSchema(schema) {
  if (!schema || typeof schema !== 'object') return null;

  const type = schema.type;

  if (schema.$ref || schema.oneOf || schema.anyOf) {
    const variants = schema.oneOf || schema.anyOf || [];
    if (variants.length) return genFromSchema(rng.pick(variants));
    return null;
  }

  switch (type) {
    case 'string': {
      if (schema.format === 'email') {
        const n = genName();
        return genEmail(n.first, n.last);
      }
      if (schema.format === 'uuid') return genUUID();
      if (schema.format === 'date-time') return genDate(new Date('2020-01-01').getTime(), new Date('2025-01-01').getTime());
      if (schema.format === 'date') return genDate(new Date('2020-01-01').getTime(), new Date('2025-01-01').getTime()).slice(0,10);
      if (schema.enum) return rng.pick(schema.enum);
      if (schema.minLength || schema.maxLength) {
        const len = rng.nextInt(schema.minLength || 3, schema.maxLength || 20);
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        return Array.from({ length: len }, () => chars[rng.nextInt(0, chars.length - 1)]).join('');
      }
      return genWord();
    }
    case 'integer':
    case 'number': {
      const min = schema.minimum ?? 0;
      const max = schema.maximum ?? 1000;
      const val = rng.nextInt(min, max);
      return type === 'number' ? parseFloat((val + rng.next()).toFixed(2)) : val;
    }
    case 'boolean':
      return rng.next() > 0.5;
    case 'array': {
      const len = rng.nextInt(schema.minItems || 1, schema.maxItems || 5);
      return Array.from({ length: len }, () => genFromSchema(schema.items || { type: 'string' }));
    }
    case 'object': {
      const obj = {};
      const props = schema.properties || {};
      for (const [key, subSchema] of Object.entries(props)) {
        const required = schema.required || [];
        if (required.includes(key) || rng.next() > 0.2) {
          obj[key] = genFromSchema(subSchema);
        }
      }
      return obj;
    }
    case 'null': return null;
    default: return genWord();
  }
}

// ─── OUTPUT FORMATTERS ──────────────────────────────────────────────────────

function toCSV(records) {
  if (!records.length) return '';
  const flattenObj = (obj, prefix = '') => {
    return Object.entries(obj).reduce((acc, [k, v]) => {
      const key = prefix ? `${prefix}.${k}` : k;
      if (v && typeof v === 'object' && !Array.isArray(v)) {
        Object.assign(acc, flattenObj(v, key));
      } else {
        acc[key] = Array.isArray(v) ? JSON.stringify(v) : v;
      }
      return acc;
    }, {});
  };
  const flat = records.map(r => flattenObj(r));
  const headers = Object.keys(flat[0]);
  const escape = v => {
    const s = String(v ?? '');
    return s.includes(',') || s.includes('"') || s.includes('\n')
      ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [
    headers.join(','),
    ...flat.map(r => headers.map(h => escape(r[h] ?? '')).join(',')),
  ].join('\n');
}

function toSQL(records, table = 'records') {
  if (!records.length) return '';
  const flat = records.map(r => {
    const out = {};
    for (const [k, v] of Object.entries(r)) {
      if (v && typeof v === 'object') out[k] = JSON.stringify(v);
      else out[k] = v;
    }
    return out;
  });
  const cols = Object.keys(flat[0]).join(', ');
  const escape = v => {
    if (v === null || v === undefined) return 'NULL';
    if (typeof v === 'boolean') return v ? '1' : '0';
    if (typeof v === 'number') return String(v);
    return `'${String(v).replace(/'/g, "''")}'`;
  };
  return flat.map(r => {
    const vals = Object.values(r).map(escape).join(', ');
    return `INSERT INTO ${table} (${cols}) VALUES (${vals});`;
  }).join('\n');
}

function formatOutput(records, opts) {
  const fmt = opts.format || 'json';
  const table = opts.table || 'records';

  if (fmt === 'csv') return toCSV(records);
  if (fmt === 'sql') return toSQL(records, table);
  return JSON.stringify(records.length === 1 ? records[0] : records, null, 2);
}

// ─── CLI PARSER ─────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = argv.slice(2);
  const opts = {
    command: null,
    subArg: null,
    count: 1,
    format: 'json',
    table: 'records',
    seed: undefined,
    from: null,
    to: null,
    stream: false,
  };

  let i = 0;
  while (i < args.length) {
    const a = args[i];
    if (!opts.command && !a.startsWith('--')) {
      opts.command = a;
    } else if (opts.command && !opts.subArg && !a.startsWith('--')) {
      opts.subArg = a;
    } else if (a === '--count' || a === '-n') {
      opts.count = parseInt(args[++i], 10) || 1;
    } else if (a === '--format' || a === '-f') {
      opts.format = args[++i];
    } else if (a === '--table' || a === '-t') {
      opts.table = args[++i];
    } else if (a === '--seed' || a === '-s') {
      opts.seed = args[++i];
    } else if (a === '--from') {
      opts.from = args[++i];
    } else if (a === '--to') {
      opts.to = args[++i];
    } else if (a === '--stream') {
      opts.stream = true;
    } else if (a === '--help' || a === '-h') {
      opts.command = 'help';
    }
    i++;
  }

  return opts;
}

// ─── HELP TEXT ───────────────────────────────────────────────────────────────

const HELP = `
test-data-gen (tdg) — zero-dependency test data generator

USAGE:
  test-data-gen <command> [options]

COMMANDS:
  user          Generate user records (id, name, email, phone, createdAt)
  address       Generate US address records
  uuid          Generate UUID v4 values
  date          Generate random dates
  credit-card   Generate Luhn-valid test credit card numbers
  custom        Generate from a template string
  from-schema   Generate from a JSON schema file

OPTIONS:
  --count, -n   Number of records to generate (default: 1)
  --format, -f  Output format: json | csv | sql (default: json)
  --table, -t   SQL table name (default: records)
  --seed, -s    Seed for deterministic output (e.g. --seed 42)
  --from        Start date for date range (YYYY-MM-DD)
  --to          End date for date range (YYYY-MM-DD)
  --stream      Continuous output mode (Ctrl+C to stop)
  --help, -h    Show this help

EXAMPLES:
  test-data-gen user --count 10
  test-data-gen user --count 5 --format csv
  test-data-gen address --count 3 --format sql --table addresses
  test-data-gen uuid --count 20
  test-data-gen date --count 10 --from 2020-01-01 --to 2024-12-31
  test-data-gen credit-card --count 5
  test-data-gen custom "{{name}} <{{email}}>"
  test-data-gen custom "User {{int:1-1000}} joined on {{date}}"
  test-data-gen from-schema schema.json --count 10
  test-data-gen user --seed 42        (deterministic output)
  test-data-gen user --stream         (continuous output)

TEMPLATE TOKENS (for custom command):
  {{name}}        Full name
  {{email}}       Email address
  {{uuid}}        UUID v4
  {{phone}}       US phone number
  {{date}}        ISO datetime
  {{word}}        Random word
  {{sentence}}    Random sentence
  {{int:1-100}}  Random integer in range
`.trim();

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function main() {
  const opts = parseArgs(process.argv);
  initRNG(opts.seed);

  const { command, subArg, count, stream } = opts;

  if (!command || command === 'help') {
    process.stdout.write(HELP + '\n');
    process.exit(0);
  }

  const generate = () => {
    switch (command) {
      case 'user': {
        const records = Array.from({ length: count }, () => genUser(opts));
        return records;
      }
      case 'address': {
        return Array.from({ length: count }, () => genAddress());
      }
      case 'uuid': {
        return Array.from({ length: count }, () => ({ uuid: genUUID() }));
      }
      case 'date': {
        const fromMs = opts.from ? new Date(opts.from).getTime() : new Date('2000-01-01').getTime();
        const toMs = opts.to ? new Date(opts.to).getTime() : new Date('2025-01-01').getTime();
        return Array.from({ length: count }, () => ({ date: genDate(fromMs, toMs) }));
      }
      case 'credit-card': {
        return Array.from({ length: count }, () => genCreditCard());
      }
      case 'custom': {
        if (!subArg) {
          process.stderr.write('Error: custom command requires a template string\n');
          process.stderr.write('Example: test-data-gen custom "{{name}} <{{email}}>"\n');
          process.exit(1);
        }
        return Array.from({ length: count }, () => ({ result: processTemplate(subArg) }));
      }
      case 'from-schema': {
        if (!subArg) {
          process.stderr.write('Error: from-schema requires a path to a JSON schema file\n');
          process.exit(1);
        }
        let schema;
        try {
          schema = JSON.parse(readFileSync(subArg, 'utf8'));
        } catch (e) {
          process.stderr.write(`Error reading schema: ${e.message}\n`);
          process.exit(1);
        }
        return Array.from({ length: count }, () => genFromSchema(schema));
      }
      default: {
        process.stderr.write(`Unknown command: ${command}\nRun with --help for usage.\n`);
        process.exit(1);
      }
    }
  };

  if (stream) {
    process.stdout.write('Streaming... (Ctrl+C to stop)\n');
    const tick = () => {
      const records = generate();
      process.stdout.write(formatOutput(records, opts) + '\n');
      setTimeout(tick, 500);
    };
    tick();
    return;
  }

  const records = generate();
  process.stdout.write(formatOutput(records, opts) + '\n');
}

main().catch(e => {
  process.stderr.write(`Fatal: ${e.message}\n`);
  process.exit(1);
});
