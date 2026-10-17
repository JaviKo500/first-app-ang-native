import { database } from '@ng-native/expo/database';


export const habitsDatabase = database( 'habits.db', 
   [
      {
         to: 1,
         up: ( db ) => db.execAsync(`
            CREATE TABLE habit (
               id TEXT PRIMARY KEY,
               name TEXT NOT NULL UNIQUE,
               color TEXT NOT NULL,
               created_at TEXT NOT NULL
            );
            CREATE TABLE completion (
               habit_id TEXT NOT NULL REFERENCES habit(id) ON DELETE CASCADE,
               date TEXT NOT NULL,
               PRIMARY KEY ( habit_id, date )
            );
         `),
         
      }
   ],
   {
      onOpen: ( db ) => db.execAsync( 'PRAGMA foreign_keys = ON;' )
   }
);