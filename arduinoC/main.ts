/** 
 * @file yfrobot
 * @brief YFROBOT's 掌控板扩展板 Mind+ library.
 * @n This is a MindPlus graphics programming extension for YFROBOT's module.
 * 
 * @copyright    YFROBOT,2022
 * @copyright    MIT Lesser General Public License
 * 
 * @author [email](yfrobot@qq.com)
 * @date  2022-03-18
*/

enum MOTORN {
    //% block="M1"
    0,
    //% block="M2"
    1,
    //% block="M1&M2"
    2
}

enum MOTORDIR {
    //% block="FORWARD"
    0,
    //% block="REVERSE"
    1
}


//% color="#57c3c2" iconWidth=50 iconHeight=40
namespace mpythonext {

    //% block="[MOT] Motor at [SPEED] speed [DIR]" blockType="command"
    //% MOT.shadow="dropdown" MOT.options="MOTORN" MOT.defl="MOTORN.0"
    //% SPEED.shadow="range"   SPEED.params.min=0    SPEED.params.max=255    SPEED.defl=200
    //% DIR.shadow="dropdown" DIR.options="MOTORDIR" DIR.defl="MOTORDIR.0"
    export function motorDrive(parameter: any, block: any) {
        let mot = parameter.MOT.code;
        let speed = parameter.SPEED.code;
        let dir = parameter.DIR.code;

        Generator.addInclude(`definempythonextmotor`, `PROGMEM void mp_motorDrive(int mot, int speed, int dir); // mpythonext motor 控制函数`)
        Generator.addInclude(`definempythonextmotorFun`, `// mpythonext motor 控制函数\n`+
            `void mp_motorDrive(int mot, int speed, int dir) {\n`+
            `  int sp = map(speed, 0, 255, 0, 1023);\n`+
            `  analogWrite(P14, 0);\n`+
            `  analogWrite(P16, 0);\n`+
            `  if (mot == 0) {    // M1电机\n`+
            `    if (dir == 0) {  // 正转\n`+
            `      digitalWrite(P13, LOW);\n`+
            `      analogWrite(P14, sp);\n`+
            `    } else {         // 反转\n`+
            `      digitalWrite(P13, HIGH);\n`+
            `      analogWrite(P14, sp);\n`+
            `    }\n`+
            `  } else if (mot == 1) {  // M2电机\n`+
            `    if (dir == 0) {  // 正转\n`+
            `      digitalWrite(P15, LOW);\n`+
            `      analogWrite(P16, sp);\n`+
            `    } else {         // 反转\n`+
            `      digitalWrite(P15, HIGH);\n`+
            `      analogWrite(P16, sp);\n`+
            `    }\n`+
            `  } else {  // M1&M2电机\n`+
            `    if (dir == 0) {  // 正转\n`+
            `      digitalWrite(P13, LOW);\n`+
            `      analogWrite(P14, sp);\n`+
            `      digitalWrite(P15, LOW);\n`+
            `      analogWrite(P16, sp);\n`+
            `    } else {         // 反转\n`+
            `      digitalWrite(P13, HIGH);\n`+
            `      analogWrite(P14, sp);\n`+
            `      digitalWrite(P15, HIGH);\n`+
            `      analogWrite(P16, sp);\n`+
            `    }\n`+
            `  }\n`+
            `}`
        );

        Generator.addCode(`mp_motorDrive(${mot},${speed},${dir});`);
    }
    
    //% block="[MOT] Motor Stop" blockType="command"
    //% MOT.shadow="dropdown" MOT.options="MOTORN" MOT.defl="MOTORN.0"
    export function motorStop(parameter: any, block: any) {
        let mot = parameter.MOT.code;

        Generator.addInclude(`definempythonextmotor`, `PROGMEM void mp_motorDrive(int mot, int speed, int dir); // mpythonext motor 控制函数`)
        Generator.addInclude(`definempythonextmotorFun`, `// mpythonext motor 控制函数\n`+
            `void mp_motorDrive(int mot, int speed, int dir) {\n`+
            `  int sp = map(speed, 0, 255, 0, 1023);\n`+
            `  analogWrite(P14, 0);\n`+
            `  analogWrite(P16, 0);\n`+
            `  if (mot == 0) {    // M1电机\n`+
            `    if (dir == 0) {  // 正转\n`+
            `      digitalWrite(P13, LOW);\n`+
            `      analogWrite(P14, sp);\n`+
            `    } else {         // 反转\n`+
            `      digitalWrite(P13, HIGH);\n`+
            `      analogWrite(P14, sp);\n`+
            `    }\n`+
            `  } else if (mot == 1) {  // M2电机\n`+
            `    if (dir == 0) {  // 正转\n`+
            `      digitalWrite(P15, LOW);\n`+
            `      analogWrite(P16, sp);\n`+
            `    } else {         // 反转\n`+
            `      digitalWrite(P15, HIGH);\n`+
            `      analogWrite(P16, sp);\n`+
            `    }\n`+
            `  } else {  // M1&M2电机\n`+
            `    if (dir == 0) {  // 正转\n`+
            `      digitalWrite(P13, LOW);\n`+
            `      analogWrite(P14, sp);\n`+
            `      digitalWrite(P15, LOW);\n`+
            `      analogWrite(P16, sp);\n`+
            `    } else {         // 反转\n`+
            `      digitalWrite(P13, HIGH);\n`+
            `      analogWrite(P14, sp);\n`+
            `      digitalWrite(P15, HIGH);\n`+
            `      analogWrite(P16, sp);\n`+
            `    }\n`+
            `  }\n`+
            `}`
        );

        Generator.addCode(`mp_motorDrive(${mot},0,0);`);
    }

}
