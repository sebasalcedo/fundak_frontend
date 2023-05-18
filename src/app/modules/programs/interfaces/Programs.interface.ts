export interface Programs {
    ok:       boolean;
    programs: Program[];
    groups?:   Group[];
    total?:    number;
}


export interface Group {
 
    name:     string;
    programs: GroupProgram[];
    id:       string;
}

export interface GroupProgram {
    program:  string;
    level:    string;
    position: string;
    _id:      string;
}

export interface Program {
    program_name:  string;
    type:          string;
    coverage:      string;
    menu_option:   string;
    state:         string;
    program_type:  string;
    Subcategory:   string;
    Timezone_from: string;
    chatbot:       string;
    start_date:    Date;
    end_date:      Date;
    id:            string;
}
