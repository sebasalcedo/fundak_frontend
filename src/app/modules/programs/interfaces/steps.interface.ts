

export interface StepsByProgram {
    ok:    boolean;
    steps: Steps[];
    total: number;
}


export interface Steps {
    numberStep: string;
    interaction:string;

    description: string;

    media:string;

}



export enum Subcategory {
    Ahorros = "ahorros",
    AsistenciaTecnica = "Asistencia Tecnica",
    BienestarEmocional = "Bienestar Emocional",
}

export enum Chatbot {
    Facebook = "Facebook",
    Multiplataforma = "Multiplataforma",
    Whatsapp = "Whatsapp",
}

export enum ProgramType {
    Program = "Program",
    SelfEnrollment = "Self enrollment",
}

export enum State {
    A = "A",
}
