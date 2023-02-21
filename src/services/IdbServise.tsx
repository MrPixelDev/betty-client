import { initDB } from "react-indexed-db";

export const IDBConfig = {
  name: "BettyDB",
  version: 1,
  objectStoresMeta: [
    {
      store: "authState",
      storeConfig: { keyPath: "authStateId", autoIncrement: false },
      storeSchema: [
        {
          name: "biName",
          keypath: "biName",
          options: { unique: false },
        },
        {
          name: "biLogin",
          keypath: "biLogin",
          options: { unique: false },
        },
        {
          name: "biPassword",
          keypath: "biPassword",
          options: { unique: false },
        },
        {
          name: "biIsAuth",
          keypath: "biIsAuth",
          options: { unique: false },
        },
      ],
    },
    {
      store: "state",
      storeConfig: { keyPath: "stateId", autoIncrement: false },
      storeSchema: [
        {
          name: "status",
          keypath: "status",
          options: { unique: false },
        },
        {
          name: "biBalance",
          keypath: "biBalance",
          options: { unique: false },
        },
        {
          name: "bkBalance",
          keypath: "bkBalance",
          options: { unique: false },
        },
        {
          name: "betSum",
          keypath: "betSum",
          options: { unique: false },
        },
        {
          name: "stackSize",
          keypath: "stackSize",
          options: { unique: false },
        },
        {
          name: "stackFilled",
          keypath: "stackFilled",
          options: { unique: false },
        },
        {
          name: "profit",
          keypath: "profit",
          options: { unique: false },
        },
      ],
    },
  ],
};

export default class IdbService {}
