const yargs = require('yargs');
const notes = require('./notes');

yargs.command(
    {
        command: 'add',
        describe: 'This will add a note',
        builder: {
            title: {
                describe:'Note Title',
                demandOption: true,
                type: 'string'
            },
            body: {
                describe: 'Note Body',
                demandOption: true,
                type: 'string'   
            }
        },
        handler: function(argv) {
            console.log('Note Title: ' + argv.title);
            console.log('Note body' + argv.body);

            notes.addNote(argv.title, argv.body);
        }
    });
     
    yargs.command({
        command: 'remove',
        describe: 'This will remove the note',
        builder: {
            title: {
                describe: 'Title of note to be removed',
                demandOption: true,
                type: 'string'
            }
        },
        handler: (argv) => {
            console.log('Note to remove: ' + argv.title);
            notes.removeNote(argv.title);
        }
    });

    yargs.command({
        command: 'read',
        describe: 'This will read the note',
        builder: {
            title: {
                describe: 'Title of the node to be fetched',
                demandOption: true,
                type: 'string'
            }
        },
        handler: (argv) => {
            console.log(notes.readNote(argv.title));
        }
    });

    yargs.command({
        command: 'list',
        describe: 'This will list the note',
        handler: (argv) => {
            notes.listNotes(argv.title);
        }
    });

    yargs.parse();