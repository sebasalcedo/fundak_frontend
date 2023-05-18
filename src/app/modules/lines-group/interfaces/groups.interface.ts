export interface GroupForm {
    name: string;
    description: string;
  }



  export interface Groups {
    _id:         ID;
    name:        string;
    description: string;
    line:        ID;
    user:        ID;
    programs:    Program[];
    createdAt:   AtedAt;
    updatedAt:   AtedAt;
    __v:         number;
}

export interface ID {
    $oid: string;
}

export interface AtedAt {
    $date: Date;
}

export interface Program {
    program:  ID;
    level:    Level;
    position: Level;
    _id:      ID;
}

export enum Level {
    Program1 = "program1",
}
