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
    1
}

enum MOTORDIR {
    //% block="FORWARD"
    0,
    //% block="REVERSE"
    1
}

enum MOVEDIR {
    //% block="FORWARD"
    0,
    //% block="BACK"
    1,
    //% block="TURNLEFT"
    2,
    //% block="TURNRIGHT"
    3,
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

        Generator.addInclude(`definempythonextmotor`, `PROGMEM void mp_motorDrive(int mot, int speed, int dir); // 掌控板扩展板电机控制函数`)
        Generator.addInclude(`definempythonextmotorFun`, `// 掌控板扩展板电机控制函数\n`+
            `void mp_motorDrive(int mot, int speed, int dir) {\n`+
            `  int sp = map(speed, 0, 255, 0, 1023);\n`+
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
        Generator.addSetup(`setupmpythonextmotor`,`mp_motorDrive(2,0,0);`);

        Generator.addCode(`mp_motorDrive(${mot},${speed},${dir});`);
    }
    
    //% block="[MOT] Motor Stop" blockType="command"
    //% MOT.shadow="dropdown" MOT.options="MOTORN" MOT.defl="MOTORN.0"
    export function motorStop(parameter: any, block: any) {
        let mot = parameter.MOT.code;

        Generator.addInclude(`definempythonextmotor`, `PROGMEM void mp_motorDrive(int mot, int speed, int dir); // 掌控板扩展板电机控制函数`)
        Generator.addInclude(`definempythonextmotorFun`, `// 掌控板扩展板电机控制函数\n`+
            `void mp_motorDrive(int mot, int speed, int dir) {\n`+
            `  int sp = map(speed, 0, 255, 0, 1023);\n`+
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
        Generator.addSetup(`setupmpythonextmotor`,`mp_motorDrive(2,0,0);`);

        Generator.addCode(`mp_motorDrive(${mot},0,0);`);
    }

    //% block="Car Move at [SPEED] speed [DIR]" blockType="command"
    //% SPEED.shadow="range"   SPEED.params.min=0    SPEED.params.max=255    SPEED.defl=200
    //% DIR.shadow="dropdown" DIR.options="MOVEDIR" DIR.defl="MOVEDIR.0"
    export function carMove(parameter: any, block: any) {
        let speed = parameter.SPEED.code;
        let dir = parameter.DIR.code;

        Generator.addInclude(`definempythonextcar`, `PROGMEM void mp_carMove(int speed, int dir); // 掌控板扩展板电机控制函数`)
        Generator.addInclude(`definempythonextcarmove`, `// 小车驱动\n`+
            `void mp_carMove(int speed, int dir) {\n`+
            `  int sp = map(speed, 0, 255, 0, 1023);\n`+
            `  // M1&M2电机\n`+
            `  if (dir == 0) {  // 前进\n`+
            `    digitalWrite(P13, LOW);\n`+
            `    analogWrite(P14, sp);\n`+
            `    digitalWrite(P15, HIGH);\n`+
            `    analogWrite(P16, sp);\n`+
            `  } else if (dir == 1) {  // 后退\n`+
            `    digitalWrite(P13, HIGH);\n`+
            `    analogWrite(P14, sp);\n`+
            `    digitalWrite(P15, LOW);\n`+
            `    analogWrite(P16, sp);\n`+
            `  } else if (dir == 2) {  // 左转\n`+
            `    digitalWrite(P13, LOW);\n`+
            `    analogWrite(P14, 0);\n`+
            `    digitalWrite(P15, HIGH);\n`+
            `    analogWrite(P16, sp);\n`+
            `  } else {         // 右转\n`+
            `    digitalWrite(P13, LOW);\n`+
            `    analogWrite(P14, sp);\n`+
            `    digitalWrite(P15, HIGH);\n`+
            `    analogWrite(P16, 0);\n`+
            `  }\n`+
            `}`
        );
        Generator.addSetup(`setupmpythonextmotor`,`mp_carMove(0,0);`);

        Generator.addCode(`mp_carMove(${speed},${dir});`);
    }

    //% block="Car Move Stop" blockType="command"
    export function carMoveStop(parameter: any, block: any) {

        Generator.addInclude(`definempythonextcar`, `PROGMEM void mp_carMove(int speed, int dir); // 掌控板扩展板电机控制函数`)
        Generator.addInclude(`definempythonextcarmove`, `// 小车驱动\n`+
            `void mp_carMove(int speed, int dir) {\n`+
            `  int sp = map(speed, 0, 255, 0, 1023);\n`+
            `  // M1&M2电机\n`+
            `  if (dir == 0) {  // 前进\n`+
            `    digitalWrite(P13, LOW);\n`+
            `    analogWrite(P14, sp);\n`+
            `    digitalWrite(P15, HIGH);\n`+
            `    analogWrite(P16, sp);\n`+
            `  } else if (dir == 1) {  // 后退\n`+
            `    digitalWrite(P13, HIGH);\n`+
            `    analogWrite(P14, sp);\n`+
            `    digitalWrite(P15, LOW);\n`+
            `    analogWrite(P16, sp);\n`+
            `  } else if (dir == 2) {  // 左转\n`+
            `    digitalWrite(P13, LOW);\n`+
            `    analogWrite(P14, 0);\n`+
            `    digitalWrite(P15, HIGH);\n`+
            `    analogWrite(P16, sp);\n`+
            `  } else {         // 右转\n`+
            `    digitalWrite(P13, LOW);\n`+
            `    analogWrite(P14, sp);\n`+
            `    digitalWrite(P15, HIGH);\n`+
            `    analogWrite(P16, 0);\n`+
            `  }\n`+
            `}`
        );
        Generator.addSetup(`setupmpythonextmotor`,`mp_carMove(0,0);`);

        Generator.addCode(`mp_carMove(0,0);`);
    }

}
