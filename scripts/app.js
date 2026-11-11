(function () {
  /* ==========================================================================
     1. Reloj del panel superior
     ========================================================================== */
  var r = document.getElementById("reloj");

  function tick() {
    var d = new Date();
    r.textContent = d.toLocaleString("es-ES", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
    r.dateTime = d.toISOString();
  }

  tick();
  setInterval(tick, 30000);

  /* ==========================================================================
     2. Utilidades de formato y sistema de archivos virtual en memoria (FS)
     ========================================================================== */
  var esc = function (s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  var A = function (h, t) {
    return '<a href="' + h + '" target="_blank" rel="noopener">' + t + "</a>";
  };

  var ok = function (t) {
    return "<span class='ok'>" + t + "</span>";
  };

  var dc = function (t) {
    return "<span class='dc'>" + esc(t) + "</span>";
  };

  // Creador de nodo tipo archivo (f) y directorio (d)
  var F = function (d) {
    return { t: "f", d: d };
  };

  var D = function (c) {
    var o = Object.create(null);
    for (var k in c) {
      o[k] = c[k];
    }
    return { t: "d", c: o };
  };

  // Clonado profundo de nodos (usado por cp)
  var cl = function (n) {
    if (n.t === "f") return F(n.d);
    var o = {};
    for (var k in n.c) {
      o[k] = cl(n.c[k]);
    }
    return D(o);
  };

  var PJ = [
    [
      "ubuntu-web",
      "Proyecto experimental que replica la experiencia del sistema operativo Ubuntu Linux directamente en el navegador. Permite realizar la mayoría de funciones que se encuentran en el escritorio real, todo desde una interfaz web interactiva.",
      "",
      "https://mmirandamartinez.com/"
    ],
    [
      "m-wipe",
      "Extensión para navegadores que elimina automáticamente banners de cookies, avisos de privacidad y muros de pago. Limpia la navegación sin tener que aceptar nada y desbloquea el scroll cuando la página intenta forzar el consentimiento. Desarrollado con Vanilla JavaScript, MutationObserver y Chrome Extensions API (MV3).",
      "JavaScript, MutationObserver, Chrome Extensions MV3",
      "https://github.com/mmirandamartinez/m-wipe"
    ],
    [
      "m-metrix",
      "Extensión para navegadores que audita una web en tiempo real y genera un informe SEO claro. Mide rendimiento, encabezados, imágenes, datos estructurados y enlaces, y ofrece una puntuación sobre 100. Desarrollado con Vanilla JavaScript y Chrome Extensions API (MV3).",
      "JavaScript, Chrome Extensions MV3",
      "https://github.com/mmirandamartinez/m-metrix"
    ],
    [
      "robotica-uca",
      "Página oficial del grupo de investigación en robótica aplicada de la Universidad de Cádiz (TEP940). Desarrollada en Laravel, PHP y React, incluye panel de administración, gestión de publicaciones y funcionalidades para importar información desde Excel, facilitando la actualización de contenido.",
      "Laravel, PHP, React",
      "https://robotics.uca.es/"
    ],
    [
      "inventario-uca",
      "Plataforma web de gestión de inventario para el laboratorio de Robotics UCA. Permite importar datos desde Excel, realizar edición manual, aplicar filtros y búsquedas avanzadas. Incluye gestión de usuarios con permisos, roles y un chatbot de asistencia. Desarrollado con Laravel y PHP 8.",
      "Laravel, PHP 8",
      "http://robotics.uca.es/inventario"
    ],
    [
      "tienda-ropa",
      "Desarrollo de una plataforma de e-commerce especializada en moda, con arquitectura desacoplada. El backend está implementado en Laravel, gestionando la lógica de negocio y la API. El frontend se construyó con React y Tailwind CSS, ofreciendo una experiencia rápida, moderna y totalmente responsive.",
      "Laravel, React, Tailwind CSS",
      "https://clothes.mmirandamartinez.com/"
    ],
    [
      "nailsbycriss",
      "Desarrollo de la página web oficial para NailsByCriss. Actúa como portafolio digital y catálogo de servicios con listado de tarifas. Integra un sistema automatizado que extrae y filtra publicaciones específicas de Instagram para alimentar la galería de trabajos en tiempo real, optimizando la gestión de contenido para el cliente.",
      "",
      "https://nailssbycrisss.com"
    ]
  ];

  var U = {
    cv: "https://mmirandamartinez.com/",
    github: "https://github.com/mmirandamartinez",
    linkedin: "https://www.linkedin.com/in/manuel-miranda-martinez-8581a6355/"
  };

  var pjc = {};
  PJ.forEach(function (p) {
    U[p[0]] = p[3];
    pjc[p[0]] = D({
      "README.md": F(
        "# " + p[0] + "\n\n" + p[1] + "\n" + (p[2] ? "\nStack: " + p[2] + "\n" : "") + "\nWeb: " + p[3] + "\n"
      )
    });
  });

  // Árbol raíz del sistema de archivos virtual (/home/mmm)
  var FS = D({
    home: D({
      mmm: D({
        "sobre-mi.txt": F(
          "Técnico de sistemas / Desarrollador Web / Ensamblaje y Mantenimiento de Equipos.\nHola, soy Manuel Miranda Martínez. Estudiante del Grado Superior en Desarrollo de Aplicaciones Web (DAW) en el IES Fernando Aguilar Quignon (Cádiz, España).\n\nSoy hábil en diversas áreas, como la comunicación efectiva, la resolución de problemas y la creatividad, lo que me permite abordar tareas de manera innovadora y colaborar eficazmente con otros. También soy una persona proactiva y con habilidades de liderazgo.\n\nEstoy en constante aprendizaje, adquiriendo nuevas habilidades para adaptarme a las tendencias tecnológicas actuales.\n"
        ),
        "habilidades.conf": F(
          "[web]\nlenguajes = HTML5, CSS3, JavaScript, PHP, Python\nframeworks = Laravel, React, Tailwind CSS, WordPress\n\n[sistemas]\nos = Windows, GNU/Linux\nhardware = Ensamblaje y mantenimiento de equipos\n\n[certificados]\ndiplomas = Python, Excel, WordPress, Copilot, IA Generativa, Comunicación Efectiva\n"
        ),
        "contacto.txt": F(
          "Puedes contactarme a través de cualquiera de los siguientes medios:\n\nemail    mmirandamartinez.it@gmail.com\ngithub   github.com/mmirandamartinez\nlinkedin Manuel Miranda Martínez\n"
        ),
        ".secreto": F(
          "Si has llegado hasta aquí con ls -a, hablamos: mmirandamartinez.it@gmail.com\n"
        ),
        proyectos: D(pjc)
      })
    })
  });

  /* ==========================================================================
     3. Resolución de rutas y comandos de la terminal Bash
     ========================================================================== */
  var cwd = ["home", "mmm"];
  var hist = [];
  var hp = 0;

  var parse = function (p) {
    var a =
      p === "~" || p.indexOf("~/") === 0
        ? ["home", "mmm"].concat(p.slice(1).split("/"))
        : p[0] === "/"
        ? p.split("/")
        : cwd.concat(p.split("/"));
    var r = [];
    a.forEach(function (x) {
      if (!x || x === ".") return;
      if (x === "..") r.pop();
      else r.push(x);
    });
    return r;
  };

  var get = function (a) {
    var n = FS;
    for (var k = 0; k < a.length; k++) {
      if (!n || n.t !== "d" || !(a[k] in n.c)) return null;
      n = n.c[a[k]];
    }
    return n;
  };

  var pd = function (a) {
    return a[0] === "home" && a[1] === "mmm"
      ? "~" + (a.length > 2 ? "/" + a.slice(2).join("/") : "")
      : "/" + a.join("/");
  };

  var P = function () {
    return '<span class="u">mmm@portfolio</span>:<span class="d">' + esc(pd(cwd)) + "</span>$ ";
  };

  var NE = "No existe el archivo o el directorio";

  var opts = function (a) {
    return a
      .filter(function (x) {
        return x[0] === "-";
      })
      .join("");
  };

  var args = function (a) {
    return a.filter(function (x) {
      return x[0] !== "-";
    });
  };

  var inside = function (r) {
    return cwd.slice(0, r.length).join("/") === r.join("/");
  };

  // Lógica compartida para mover (mv) y copiar (cp)
  function mc(a, mv) {
    var nm = mv ? "mv" : "cp";
    var rec = /r/i.test(opts(a));
    var t = args(a);
    if (t.length < 2) return nm + ": falta el operando de destino";

    var sr = parse(t[0]);
    var sn = get(sr);
    var tr = parse(t[1]);
    var tn = get(tr);

    if (!sn) return nm + ": no se puede efectuar 'stat' sobre '" + esc(t[0]) + "': " + NE;
    if (sn.t === "d" && !mv && !rec) return "cp: se omite el directorio '" + esc(t[0]) + "' (usa -r)";
    if (mv && sr.length < 3) return "mv: eso no se mueve";

    var dp, dn, dd;
    if (tn && tn.t === "d") {
      dp = tn;
      dn = sr[sr.length - 1];
      dd = tr.concat(dn);
    } else {
      dp = get(tr.slice(0, -1));
      dn = tr[tr.length - 1];
      dd = tr;
    }

    if (!dp || dp.t !== "d" || !dn) return nm + ": no se puede crear '" + esc(t[1]) + "': " + NE;
    if (dd.join("/") === sr.join("/")) return "";
    if (sn.t === "d" && dd.join("/").indexOf(sr.join("/") + "/") === 0) {
      return nm + ": no se puede copiar un directorio dentro de sí mismo";
    }

    dp.c[dn] = mv ? sn : cl(sn);
    if (mv) delete get(sr.slice(0, -1)).c[sr[sr.length - 1]];
    return "";
  }

  var CMD = {
    ls: function (a) {
      var fl = opts(a);
      var t = args(a);
      var all = fl.indexOf("a") > -1;
      var lg = fl.indexOf("l") > -1;
      var out = [];
      if (!t.length) t = ["."];

      t.forEach(function (x) {
        var n = get(parse(x));
        if (!n) {
          out.push("ls: no se puede acceder a '" + esc(x) + "': " + NE);
          return;
        }
        var names =
          n.t === "d"
            ? Object.keys(n.c)
                .filter(function (k) {
                  return all || k[0] !== ".";
                })
                .sort()
            : [x];
        var it = names.map(function (k) {
          var c = n.t === "d" ? n.c[k] : n;
          var s = c.t === "d" ? dc(k) : esc(k);
          return lg
            ? (c.t === "d" ? "drwxr-xr-x" : "-rw-r--r--") +
                " mmm mmm " +
                String(c.t === "d" ? 4096 : c.d.length).padStart(5) +
                " " +
                s
            : s;
        });
        out.push((t.length > 1 ? esc(x) + ":\n" : "") + it.join(lg ? "\n" : "  "));
      });
      return out.join("\n");
    },

    cd: function (a) {
      var p = a[0] || "~";
      var r = parse(p);
      var n = get(r);
      if (!n) return "bash: cd: " + esc(p) + ": " + NE;
      if (n.t !== "d") return "bash: cd: " + esc(p) + ": No es un directorio";
      cwd = r;
      setP();
      return "";
    },

    pwd: function () {
      return "/" + cwd.join("/");
    },

    cat: function (a) {
      if (!a.length) return "cat: indica un archivo";
      return a
        .map(function (x) {
          var n = get(parse(x));
          return !n
            ? "cat: " + esc(x) + ": " + NE
            : n.t === "d"
            ? "cat: " + esc(x) + ": Es un directorio"
            : esc(n.d);
        })
        .join("\n");
    },

    mkdir: function (a) {
      var pf = opts(a).indexOf("p") > -1;
      var t = args(a);
      if (!t.length) return "mkdir: falta el operando";
      return t
        .map(function (x) {
          var r = parse(x);
          var nm = r[r.length - 1];
          if (!nm) return "mkdir: nombre no válido";
          var par = get(r.slice(0, -1));
          if (!par && pf) {
            par = FS;
            r.slice(0, -1).forEach(function (k) {
              if (par.t === "d" && !(k in par.c)) par.c[k] = D();
              par = par.c && par.c[k];
            });
          }
          if (!par || par.t !== "d") return "mkdir: no se puede crear el directorio «" + esc(x) + "»: " + NE;
          if (nm in par.c) return pf ? "" : "mkdir: no se puede crear el directorio «" + esc(x) + "»: El fichero ya existe";
          par.c[nm] = D();
          return "";
        })
        .filter(Boolean)
        .join("\n");
    },

    touch: function (a) {
      return args(a)
        .map(function (x) {
          var r = parse(x);
          var nm = r[r.length - 1];
          var par = get(r.slice(0, -1));
          if (!nm || !par || par.t !== "d") return "touch: no se puede hacer touch a '" + esc(x) + "': " + NE;
          if (!(nm in par.c)) par.c[nm] = F("");
          return "";
        })
        .filter(Boolean)
        .join("\n");
    },

    rm: function (a) {
      var rec = /[rR]/.test(opts(a));
      var t = args(a);
      if (!t.length) return "rm: falta el operando";
      return t
        .map(function (x) {
          var r = parse(x);
          var n = get(r);
          if (!n) return "rm: no se puede borrar '" + esc(x) + "': " + NE;
          if (r.length < 3) return "rm: no tan rápido. Eso no se toca. Buen intento.";
          if (n.t === "d" && !rec) return "rm: no se puede borrar '" + esc(x) + "': Es un directorio";
          if (inside(r)) return "rm: no puedes borrar el directorio en el que estás";
          delete get(r.slice(0, -1)).c[r[r.length - 1]];
          return "";
        })
        .filter(Boolean)
        .join("\n");
    },

    rmdir: function (a) {
      return args(a)
        .map(function (x) {
          var r = parse(x);
          var n = get(r);
          if (!n) return "rmdir: fallo al borrar '" + esc(x) + "': " + NE;
          if (n.t !== "d") return "rmdir: fallo al borrar '" + esc(x) + "': No es un directorio";
          if (Object.keys(n.c).length) return "rmdir: fallo al borrar '" + esc(x) + "': El directorio no está vacío";
          if (r.length < 3 || inside(r)) return "rmdir: no se puede borrar '" + esc(x) + "'";
          delete get(r.slice(0, -1)).c[r[r.length - 1]];
          return "";
        })
        .filter(Boolean)
        .join("\n");
    },

    mv: function (a) {
      return mc(a, 1);
    },

    cp: function (a) {
      return mc(a, 0);
    },

    echo: function (a) {
      var k = a.indexOf(">>");
      var ap = k > -1;
      if (!ap) k = a.indexOf(">");
      var txt = (k > -1 ? a.slice(0, k) : a).join(" ");
      if (k < 0) return esc(txt);

      var x = a[k + 1];
      if (!x) return "bash: error de sintaxis cerca del elemento inesperado «newline»";
      var r = parse(x);
      var nm = r[r.length - 1];
      var par = get(r.slice(0, -1));
      if (!nm || !par || par.t !== "d") return "bash: " + esc(x) + ": " + NE;
      var ex = par.c[nm];
      if (ex && ex.t === "d") return "bash: " + esc(x) + ": Es un directorio";
      par.c[nm] = F((ap && ex ? ex.d : "") + txt + "\n");
      return "";
    },

    nano: function (a) {
      var x = args(a)[0];
      if (!x) return "nano: indica un nombre de archivo. Ejemplo: nano notas.txt";
      var r = parse(x);
      var n = get(r);
      var par = get(r.slice(0, -1));
      if (n && n.t === "d") return "nano: " + esc(x) + " es un directorio";
      if (!par || par.t !== "d") return "nano: no se puede abrir '" + esc(x) + "': " + NE;
      edOpen(r, x);
      return "";
    },

    tree: function (a) {
      var x = a[0] || ".";
      var n = get(parse(x));
      if (!n || n.t !== "d") return "tree: " + esc(x) + ": no es un directorio";
      var o = [dc(x)];
      (function w(d, p) {
        var k = Object.keys(d.c)
          .filter(function (z) {
            return z[0] !== ".";
          })
          .sort();
        k.forEach(function (z, j) {
          var l = j === k.length - 1;
          var c = d.c[z];
          o.push(p + (l ? "└── " : "├── ") + (c.t === "d" ? dc(z) : esc(z)));
          if (c.t === "d") w(c, p + (l ? "    " : "│   "));
        });
      })(n, "");
      return o.join("\n");
    },

    whoami: function () {
      return "mmm  —  Manuel Miranda Martínez, técnico de sistemas y desarrollador web";
    },

    hostname: function () {
      return "portfolio";
    },

    date: function () {
      return new Date().toLocaleString("es-ES", { dateStyle: "full", timeStyle: "medium" });
    },

    uname: function (a) {
      return a.indexOf("-a") > -1
        ? "Linux portfolio 6.8.0-mmm #1 SMP PREEMPT x86_64 GNU/Linux"
        : "Linux";
    },

    neofetch: function () {
      var L = function (k, v) {
        return ok(k) + ": " + v;
      };
      return (
        "<span class='u'>mmm</span>@<span class='u'>portfolio</span>\n-------------\n" +
        [
          L("OS", "Ubuntu Web 24.04 (en el navegador)"),
          L("Host", "mmirandamartinez.com"),
          L("Kernel", "JavaScript"),
          L("Shell", "bash, casi"),
          L("Paquetes", "Laravel, React, Tailwind"),
          L("Ubicación", "Cádiz, España")
        ].join("\n")
      );
    },

    history: function () {
      return hist
        .map(function (c, k) {
          return String(k + 1).padStart(4) + "  " + esc(c);
        })
        .join("\n");
    },

    proyectos: function () {
      return CMD.ls(["~/proyectos"]);
    },

    contacto: function () {
      return '<a href="mailto:mmirandamartinez.it@gmail.com">mmirandamartinez.it@gmail.com</a>';
    },

    cv: function () {
      return A(U.cv, "Manuel_Miranda_Martínez.pdf");
    },

    github: function () {
      return A(U.github, "github.com/mmirandamartinez");
    },

    linkedin: function () {
      return A(U.linkedin, "Manuel Miranda Martínez");
    },

    ubuntu: function () {
      return '<a href="https://mmirandamartinez.com/">/ubuntu</a>';
    },

    open: function (a) {
      var x = a[0];
      if (!x) return "uso: open &lt;proyecto|cv|github|linkedin&gt;";
      if (!(x in U)) return "open: no sé abrir '" + esc(x) + "'";
      window.open(U[x], "_blank", "noopener");
      return "Abriendo " + esc(x) + "…";
    },

    sudo: function () {
      return "mmm no está en el archivo sudoers. Este incidente será reportado.";
    },

    ayuda: function (a) {
      var H = [
        ["ls", "ls [-al] [archivo...]", "Lista el contenido de un directorio. -a muestra los ocultos y -l usa formato largo."],
        ["cd", "cd [dir]", "Cambia el directorio de trabajo. Sin argumentos vuelve a ~."],
        ["pwd", "pwd", "Muestra la ruta del directorio actual."],
        ["cat", "cat archivo...", "Muestra el contenido de uno o más archivos."],
        ["mkdir", "mkdir [-p] dir...", "Crea directorios. -p crea también los intermedios."],
        ["touch", "touch archivo...", "Crea archivos vacíos si no existen."],
        ["rm", "rm [-r] archivo...", "Borra archivos. -r borra directorios con su contenido."],
        ["rmdir", "rmdir dir...", "Borra directorios vacíos."],
        ["mv", "mv origen destino", "Mueve o renombra archivos y directorios."],
        ["cp", "cp [-r] origen destino", "Copia archivos. -r copia directorios."],
        ["tree", "tree [dir]", "Muestra el contenido de un directorio en forma de árbol."],
        ["echo", "echo [texto] [> archivo]", "Escribe texto. Con > o >> lo guarda en un archivo."],
        ["nano", "nano archivo", "Abre el editor de texto. Ctrl+O guarda y Ctrl+X sale."],
        ["whoami", "whoami", "Dice quién soy."],
        ["neofetch", "neofetch", "Muestra información del sistema."],
        ["proyectos", "proyectos", "Lista mis proyectos."],
        ["contacto", "contacto", "Muestra mi email."],
        ["cv", "cv", "Enlace a mi currículum."],
        ["github", "github", "Enlace a mi GitHub."],
        ["linkedin", "linkedin", "Enlace a mi LinkedIn."],
        ["open", "open nombre", "Abre en otra pestaña un proyecto, cv, github o linkedin."],
        ["history", "history", "Muestra los comandos escritos."],
        ["date", "date", "Muestra la fecha y la hora."],
        ["uname", "uname [-a]", "Muestra información del sistema operativo."],
        ["clear", "clear", "Limpia la pantalla."],
        ["exit", "exit", "Cierra la terminal."],
        ["help", "help [comando]", "Muestra esta ayuda o la de un comando."]
      ];
      if (a[0]) {
        var f = H.filter(function (x) {
          return x[0] === a[0];
        })[0];
        return f
          ? ok(f[0]) + ": " + esc(f[1]) + "\n    " + esc(f[2])
          : "bash: help: ninguna ayuda coincide con «" + esc(a[0]) + "». Prueba «help help».";
      }
      return (
        "mmm bash, versión 1.0 (portfolio-javascript)\n" +
        "Estos comandos están definidos internamente. Escribe «help» para ver esta lista.\n" +
        "Escribe «help nombre» para saber más sobre la función «nombre».\n" +
        "Tab autocompleta y ↑ ↓ recorre el historial.\n\n" +
        "<span class='hg'>" +
        H.map(function (x) {
          return "<span>" + ok(x[0]) + esc(x[1].slice(x[0].length)) + "</span>";
        }).join("") +
        "</span>"
      );
    }
  };

  CMD.vim = CMD.vi = CMD.nano;
  CMD.help = CMD.man = CMD.ayuda;

  /* ==========================================================================
     4. Interfaz de la terminal interactiva (#t2) y autocompletado con Tab
     ========================================================================== */
  var t2 = document.getElementById("t2");
  var i = document.getElementById("i");
  var h = document.getElementById("h");
  var tb = t2.querySelector(".tb");
  var mw = document.querySelector(".win");
  var pl = document.getElementById("pl");
  var Z = 10;

  function setP() {
    pl.innerHTML = P();
  }

  function front(w) {
    w.style.zIndex = ++Z;
  }

  function openT() {
    t2.hidden = false;
    front(t2);
    i.focus();
  }

  function closeT() {
    t2.hidden = true;
  }

  function say(x) {
    if (x) h.insertAdjacentHTML("beforeend", '<div class="ov">' + x + "</div>");
  }

  function runC(v) {
    h.insertAdjacentHTML("beforeend", '<div class="ec">' + P() + esc(v) + "</div>");
    var a = (v.match(/"[^"]*"|'[^']*'|\S+/g) || []).map(function (x) {
      return x.replace(/^(["'])(.*)\1$/, "$2");
    });
    if (!a.length) return;
    var c = a.shift();
    if (c === "clear") {
      h.innerHTML = "";
      return;
    }
    if (c === "exit") {
      closeT();
      return;
    }
    say(
      Object.prototype.hasOwnProperty.call(CMD, c)
        ? CMD[c](a)
        : "bash: " + esc(c) + ": orden no encontrada. Escribe " + ok("ayuda") + "."
    );
  }

  function tab() {
    var v = i.value;
    var sp = v.lastIndexOf(" ");
    var w = v.slice(sp + 1);
    var pre = w;
    var dir = "";
    var op;

    if (sp < 0) {
      op = Object.keys(CMD);
    } else {
      var sl = w.lastIndexOf("/");
      dir = w.slice(0, sl + 1);
      pre = w.slice(sl + 1);
      var d = get(parse(dir || "."));
      op =
        d && d.t === "d"
          ? Object.keys(d.c)
              .filter(function (k) {
                return k[0] !== "." || pre[0] === ".";
              })
              .map(function (k) {
                return k + (d.c[k].t === "d" ? "/" : "");
              })
          : [];
    }

    var m = op
      .filter(function (k) {
        return k.indexOf(pre) === 0;
      })
      .sort();
    if (!m.length) return;

    var cp = m.reduce(function (a, b) {
      var n = 0;
      while (n < a.length && a[n] === b[n]) n++;
      return a.slice(0, n);
    });

    if (m.length === 1) {
      i.value = v.slice(0, sp + 1) + dir + cp + (cp.slice(-1) === "/" ? "" : " ");
      return;
    }
    if (cp.length > pre.length) {
      i.value = v.slice(0, sp + 1) + dir + cp;
      return;
    }
    h.insertAdjacentHTML("beforeend", '<div class="ec">' + P() + esc(v) + "</div>");
    say(
      m
        .map(function (k) {
          return k.slice(-1) === "/" ? dc(k) : esc(k);
        })
        .join("  ")
    );
    tb.scrollTop = tb.scrollHeight;
  }

  document.getElementById("pt").addEventListener("click", function () {
    t2.hidden ? openT() : closeT();
  });

  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-open]");
    if (a) {
      e.preventDefault();
      openT();
    }
  });

  t2.querySelector(".x").addEventListener("click", closeT);

  tb.addEventListener("click", function () {
    if (!getSelection().toString()) i.focus();
  });

  t2.addEventListener("pointerdown", function () {
    front(t2);
  });

  i.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      var v = i.value;
      i.value = "";
      if (v.trim()) hist.push(v.trim());
      hp = hist.length;
      runC(v);
      tb.scrollTop = tb.scrollHeight;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (hp > 0) {
        hp--;
        i.value = hist[hp];
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hp < hist.length) {
        hp++;
        i.value = hist[hp] || "";
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      tab();
    } else if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      h.innerHTML = "";
    }
  });

  /* ==========================================================================
     5. Editor de texto integrado estilo GNU nano (#ed)
     ========================================================================== */
  var ed = document.getElementById("ed");
  var ea = document.getElementById("ea");
  var en = document.getElementById("en");
  var eq = document.getElementById("eq");
  var ec = null;

  function edOpen(r, x) {
    var n = get(r);
    ec = { r: r, o: n ? n.d : "", ask: false };
    ea.value = ec.o;
    en.textContent = x;
    eq.textContent = n ? "" : "Archivo nuevo";
    ed.hidden = false;
    ea.focus();
  }

  function edSave() {
    var par = get(ec.r.slice(0, -1));
    var nm = ec.r[ec.r.length - 1];
    if (!par || par.t !== "d" || (nm in par.c && par.c[nm].t === "d")) {
      eq.textContent = "Error al guardar";
      return;
    }
    par.c[nm] = F(ea.value);
    ec.o = ea.value;
    eq.textContent = "Guardado (" + ea.value.split("\n").length + " líneas)";
  }

  function edClose() {
    ed.hidden = true;
    ec = null;
    i.focus();
  }

  function edAct(a) {
    if (!ec) return;
    if (a === "o") {
      edSave();
    } else if (a === "x") {
      if (ea.value !== ec.o) {
        ec.ask = true;
        eq.innerHTML =
          '¿Guardar cambios? <button type="button" data-a="s">Sí (S)</button><button type="button" data-a="n">No (N)</button><button type="button" data-a="c">Cancelar (Esc)</button>';
      } else {
        edClose();
      }
    } else if (a === "s") {
      edSave();
      edClose();
    } else if (a === "n") {
      edClose();
    } else if (a === "c") {
      ec.ask = false;
      eq.textContent = "";
    }
  }

  ed.addEventListener("click", function (e) {
    var b = e.target.closest("[data-a]");
    if (b) edAct(b.dataset.a);
  });

  ea.addEventListener("keydown", function (e) {
    var k = e.key.toLowerCase();
    if (ec && ec.ask) {
      e.preventDefault();
      edAct(k === "s" || k === "y" ? "s" : k === "n" ? "n" : k === "escape" ? "c" : "");
      return;
    }
    if (e.ctrlKey && k === "o") {
      e.preventDefault();
      edAct("o");
    } else if (e.ctrlKey && k === "x") {
      e.preventDefault();
      edAct("x");
    }
  });

  setP();

  /* ==========================================================================
     6. Sistema de arrastre de ventanas (Pointer Events)
     ========================================================================== */
  function drag(w, bar) {
    bar.addEventListener("pointerdown", function (e) {
      front(w);
      if (e.target.closest("button") || innerWidth <= 720) return;

      var r = w.getBoundingClientRect();
      var sx = e.clientX;
      var sy = e.clientY;
      var m = /translate\(([-\d.]+)px,\s*([-\d.]+)px\)/.exec(w.style.transform) || [0, 0, 0];
      var ox = +m[1];
      var oy = +m[2];

      bar.setPointerCapture(e.pointerId);

      function mv(ev) {
        var nx = Math.min(Math.max(r.left + ev.clientX - sx, 90 - r.width), innerWidth - 90);
        var ny = Math.min(Math.max(r.top + ev.clientY - sy, Math.min(34, r.top)), innerHeight - 40);
        w.style.transform = "translate(" + (ox + nx - r.left) + "px," + (oy + ny - r.top) + "px)";
      }

      function up() {
        bar.removeEventListener("pointermove", mv);
        bar.removeEventListener("pointerup", up);
        bar.removeEventListener("pointercancel", up);
      }

      bar.addEventListener("pointermove", mv);
      bar.addEventListener("pointerup", up);
      bar.addEventListener("pointercancel", up);
    });
  }

  drag(mw, mw.querySelector(".bar"));
  drag(t2, t2.querySelector(".bar"));

  /* ==========================================================================
     7. Previsualización de capturas de proyectos y certificados (#pv)
     ========================================================================== */
  var det = [].slice.call(document.querySelectorAll("#proyectos details"));

  if (!matchMedia("(hover:hover) and (min-width:900px)").matches) {
    document.getElementById("pjh").textContent = "7 proyectos, cada uno con su captura.";
    det.forEach(function (d) {
      var m = document.createElement("img");
      var b = d.querySelector(".body");
      m.className = "shot";
      m.loading = "lazy";
      m.alt = d.querySelector(".pn").textContent;
      m.src = d.dataset.img;
      m.onerror = function () {
        m.remove();
      };
      b.insertBefore(m, b.querySelector(".lnk"));
    });
  } else {
    var pv = document.getElementById("pv");
    var pi = pv.querySelector("img");
    var cur = null;

    pi.onerror = function () {
      if (cur) cur._bad = true;
      pv.classList.add("err");
    };

    pi.onload = function () {
      if (cur) cur._bad = false;
      pv.classList.remove("err");
    };

    det.forEach(function (d) {
      d.addEventListener("mouseenter", function () {
        cur = d;
        var n = d.querySelector(".n").textContent;
        var f = d.dataset.img.split("/").pop();
        pv.querySelector(".ttl").textContent = "mmm@portfolio: ~/proyectos/" + n;
        pv.querySelector(".pc").textContent = "display " + f;
        pv.querySelector(".nf").textContent = n.replace("/", "") + ": captura no disponible en esta vista";
        pv.classList.toggle("err", !!d._bad);
        pi.alt = d.querySelector(".pn").textContent;
        pi.src = d.dataset.img;

        var w = Math.min(440, innerWidth * 0.34);
        var mr = mw.getBoundingClientRect();
        var r = d.getBoundingClientRect();
        pv.style.width = w + "px";
        pv.style.left = (innerWidth - mr.right >= w + 32 ? mr.right + 16 : innerWidth - w - 24) + "px";
        pv.style.top = Math.max(56, Math.min(r.top, innerHeight - w * 0.625 - 110)) + "px";
        pv.classList.add("on");
      });

      d.addEventListener("mouseleave", function () {
        pv.classList.remove("on");
      });
    });

    addEventListener(
      "scroll",
      function () {
        pv.classList.remove("on");
      },
      { passive: true }
    );

    [].slice.call(document.querySelectorAll(".cert-link")).forEach(function (c) {
      c.addEventListener("mouseenter", function () {
        if (!c.dataset.img) return;
        cur = c;
        pv.querySelector(".ttl").textContent = "mmm@portfolio: ~/certificados/" + c.textContent;
        pv.querySelector(".pc").textContent = "display " + c.dataset.img.split("/").pop();
        pv.querySelector(".nf").textContent = c.textContent + ": captura no disponible en esta vista";
        pv.classList.toggle("err", !!c._bad);
        pi.alt = c.textContent;
        pi.src = c.dataset.img;

        var w = Math.min(440, innerWidth * 0.34);
        var mr = mw.getBoundingClientRect();
        var r = c.getBoundingClientRect();
        pv.style.width = w + "px";
        pv.style.left = (innerWidth - mr.right >= w + 32 ? mr.right + 16 : innerWidth - w - 24) + "px";
        pv.style.top = Math.max(56, Math.min(r.top, innerHeight - w * 0.625 - 110)) + "px";
        pv.classList.add("on");
      });

      c.addEventListener("mouseleave", function () {
        pv.classList.remove("on");
      });
    });
  }

  /* ==========================================================================
     8. Efecto máquina de escribir al hacer scroll (IntersectionObserver)
     ========================================================================== */
  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
  document.documentElement.classList.add("anim");

  function prep(el) {
    var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    var a = [];
    var n;
    while ((n = w.nextNode())) {
      if (n.nodeValue.trim()) a.push(n);
    }
    return a.map(function (n) {
      var s = n.nodeValue;
      var x = document.createElement("span");
      x.className = "hid";
      x.textContent = s;
      n.nodeValue = "";
      n.parentNode.insertBefore(x, n.nextSibling);
      return { v: n, h: x, s: s, i: 0 };
    });
  }

  function run(it, per, ms, cur, done) {
    var k = 0;
    (function f() {
      if (k >= it.length) {
        if (cur && cur.parentNode) cur.remove();
        if (done) done();
        return;
      }
      var x = it[k];
      if (cur) x.h.parentNode.insertBefore(cur, x.h);
      x.i = Math.min(x.s.length, x.i + per);
      x.v.nodeValue = x.s.slice(0, x.i);
      x.h.textContent = x.s.slice(x.i);
      if (x.i >= x.s.length) k++;
      setTimeout(f, ms);
    })();
  }

  var blks = [].slice.call(document.querySelectorAll(".blk"));
  blks.forEach(function (b) {
    b._k = [].slice.call(b.children).map(function (el) {
      var o = { el: el };
      if (el.classList.contains("cmd")) {
        o.it = prep(el.querySelector(".t"));
      } else if (el.hasAttribute("data-s")) {
        o.st = [].slice.call(el.children);
        o.st.forEach(function (c) {
          c.classList.add("pend");
        });
      } else if (!el.hasAttribute("data-p")) {
        o.it = prep(el);
        o.slow = el.hasAttribute("data-slow");
      }
      el.classList.add("pend");
      return o;
    });
  });

  function play(b) {
    var k = b._k;
    var n = 0;
    (function next() {
      var o = k[n++];
      if (!o) return;
      o.el.classList.remove("pend");
      if (o.el.classList.contains("cmd")) {
        var cur = document.createElement("span");
        cur.className = "cursor";
        cur.setAttribute("aria-hidden", "true");
        run(o.it, 1, 38, cur, function () {
          setTimeout(next, 200);
        });
      } else if (o.st) {
        o.st.forEach(function (c, j) {
          setTimeout(function () {
            c.classList.remove("pend");
          }, j * 110);
        });
        setTimeout(next, o.st.length * 110 + 80);
      } else if (o.it) {
        run(o.it, o.slow ? 1 : 3, o.slow ? 55 : 11, null, next);
      } else {
        next();
      }
    })();
  }

  var io = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          io.unobserve(e.target);
          play(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px" }
  );

  blks.forEach(function (b) {
    io.observe(b);
  });
})();