export type GlobalAttributes = {
  bgcolor?:[number, number, number, number];
  bordercolor?:[number, number, number, number];
  rect?: [number, number, number, number];
}

export type TextStyle = {
  bgcolor?:[number, number, number, number];
  textcolor?:[number, number, number, number];
  fontsize?: number;
  fontname?: string;
  fontface?: 0|1|2|3;//'regular'|'italic'|'bold'|'bold italic';
}
// IGNORE RADIOGROUP FOR NOW
export type InputAttributeMap = {
    Number: {
      dial: {
        vtracking?: 0|1; // 'radial' | 'vertical';
        // there is no correspoding property on the nexus vui object, but this will set the background container
        bgcolor?:[number, number, number, number];
        // the nexus ui mode property does not existing on the corresponding max object
        outlinecolor?:[number, number, number, number];
        needlecolor?: [number, number, number, number];
      };
      number: TextStyle&{
        bgcolor?:[number, number, number, number];
        textcolor?:[number, number, number, number];
      };
      slider: {
        relative: 0|1; // 'absolute |relative 
        // there is no correspoding property on the nexus vui object, but this will set the background container
        bgcolor?:[number, number, number, number];

        elementcolor?:[number, number, number, number];
        knobcolor?: [number, number, number, number];
      };
      //no fully corresponding maxobj
      //pan: {}
    };
    Enum: {
      umenu: TextStyle;
      toggle: {
        checkedcolor?: [number, number, number, number];
        uncheckedcolor?: [number, number, number, number];
      };
      //no fully corresponding maxobj, could implement
       // textbutton: TextStyle&{};
       
      // no fully corresponding rnbo parameter ?? 
       // radiogroup: TextStyle&{};
    };
    List: {
      message: TextStyle;
      kslider: {
        mode?: 0|1|2; //  'toggle' | 'button'
        offset?: number;
        range: number;
        hkeycolor?: [number, number, number, number];
        whitekeycolor?:[number, number, number, number];
        blackkeycolor?:[number, number, number, number];
      };
      function: {
        domain?: number
        range?: [number, number]
        linecolor?: [number, number, number, number];
        bgcolor?: [number, number, number, number];
      };
      position: {
  
      };
      nodes: {
  
      };
      multislider: {

    };
    matrixctrl: {

    };
  };
    Message: {
      textedit: TextStyle;
    };
  };
  
  export type InputType = keyof InputAttributeMap;
  
  export type NumberInputType = keyof InputAttributeMap['Number'];
  export type EnumInputType = keyof InputAttributeMap['Enum'];
  export type ListInputType = keyof InputAttributeMap['List'];
  export type MessageInputType = keyof InputAttributeMap['Message'];
  
  export type UIType<T extends InputType> = keyof InputAttributeMap[T];
  
  export type GenericAttributes = Record<string, string> & {
    maxobj: string;
    intype: InputType;
    annotation?: string;
    hint?: string;
    customLayout?: boolean;
    rect?: [number, number, number, number];
};

export type InputAttributes<T extends keyof InputAttributeMap, UI extends UIType<T>> = InputAttributeMap[T][UI]&GenericAttributes;
export const DefaultGenericAttributes = {
  bgcolor: [0.2, 0.2, 0.2, 1]
}

