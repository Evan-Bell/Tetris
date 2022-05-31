(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,i){},12:function(e,t,i){"use strict";i.r(t);var r=i(0),s=i.n(r),a=i(3),o=i.n(a),h=(i(11),function(e){e&&e instanceof Function&&i.e(3).then(i.bind(null,13)).then(function(t){var i=t.getCLS,r=t.getFID,s=t.getFCP,a=t.getLCP,o=t.getTTFB;i(e),r(e),s(e),a(e),o(e)})}),n=i(1);function c(e){for(var t=e.inputboard,i=e.inputwidth,r=e.inputheight,a=[],o=0;o<r;o++)a.push(o);for(var h=[],n=0;n<i+2;n++)h.push(n);var c="c";return s.a.createElement("div",{className:"TetrisBoard"},s.a.createElement("tr",{className:"TetrisRow"},h.map(function(e){return s.a.createElement("td",{className:"TetrisCell",id:"cBorder"})})),a.map(function(e){return s.a.createElement("tr",{className:"TetrisRow",id:"r"+e},s.a.createElement("td",{className:"TetrisCell",id:"cBorder"}),t.board[e].map(function(e){return s.a.createElement("td",{className:"TetrisCell",id:c+e})}),s.a.createElement("td",{className:"TetrisCell",id:"cBorder"}))}),s.a.createElement("tr",{className:"TetrisRow"},h.map(function(e){return s.a.createElement("td",{className:"TetrisCell",id:"cBorder"})})))}function l(e){var t=e.inputboard;return s.a.createElement("div",{className:"TetrisControls"},s.a.createElement("div",{className:"score-display"},"Score: ",t.score),s.a.createElement("div",{className:"level-display"},"Level: ",t.level),s.a.createElement("div",{className:"hold-display"},"Hold: ",t.hold),s.a.createElement("div",{className:"next-display"},"Next: ",t.next),s.a.createElement("div",{className:"highscore-display"},"Highscore: ",t.highscore),s.a.createElement("div",{className:"highlevel-display"},"Highlevel: ",t.highlevel),s.a.createElement("div",{className:"droptime"},"droptime: ",t.droptime))}var d=i(4),v=i(5),u=function(e){var t=Object(r.useState)(),i=Object(n.a)(t,2),s=i[0],a=i[1];return Object(r.useEffect)(function(){var t=function(t){var i=t.key;s!==i&&1===i.length&&(a(i),e&&e(i))},i=function(){a(null)};return window.addEventListener("keydown",t),window.addEventListener("keyup",i),function(){window.removeEventListener("keydown",t),window.removeEventListener("keyup",i)}}),s},p=10,f=24,_=new(function(){function e(t,i){var r=this;Object(d.a)(this,e),this.width=t,this.height=i,this.board=[],this.score=0,this.level=0,this.pivot=[],this.pieces=[2,3,4,5,6,7,8],this.coor=[[0,0],[0,0],[0,0],[0,0]],this.hold=0,this.hold_swapped=!1,this.next=[0,0,0],this.highlevel=0,this.highscore=0,this.droptime=900,this.interval=setInterval(function(){r.piece_fall()},this.droptime),this.create_board()}return Object(v.a)(e,[{key:"create_board",value:function(){for(var e=[],t=0;t<this.height;t++){e[t]=[];for(var i=0;i<this.width;i++)e[t][i]=0}return this.board=e,this.next_piece_grab(),this.board}},{key:"gen_piece",value:function(e,t){0===this.pieces.length&&(this.pieces=[2,3,4,5,6,7,8]),this.pieces=this.pieces.sort(function(){return Math.random()-.5});var i=this.pieces.pop(this.pieces.length-1);if(t>1&&(i=1*t),e){for(var r={2:[[0,0],[1,-1],[1,0],[1,1],[1,0]],3:[[0,0],[0,1],[1,0],[1,1],[.5,.5]],4:[[0,-1],[0,0],[0,1],[0,2],[.5,.5]],5:[[0,1],[1,-1],[1,0],[1,1],[1,0]],6:[[0,-1],[1,-1],[1,0],[1,1],[1,0]],7:[[0,-1],[0,0],[1,0],[1,1],[1,0]],8:[[1,-1],[0,0],[1,0],[0,1],[1,0]]}[i],s=0;s<4;s++)this.board[r[s][0]+1][r[s][1]+4]=-i;this.pivot=r[4],this.pivot[0]+=1,this.pivot[1]+=4,this.update_ghost()}return i}},{key:"sleep",value:function(e){return new Promise(function(t){return setTimeout(t,e)})}},{key:"piece_fall",value:function(){for(var e=this.update_coor(),t=!0,i=0;i<4;i++){var r=e[i][0],s=e[i][1];(r===this.height-1||this.board[r+1][s]>1)&&(t=!1)}if(!0!==t)this.solidify_piece(),this.over_stack_check();else{for(var a=this.board[e[0][0]][e[0][1]],o=0;o<4;o++)this.board[e[o][0]][e[o][1]]=0;for(var h=0;h<4;h++)this.board[e[h][0]+1][e[h][1]]=a;this.pivot[0]+=1}return t}},{key:"update_coor",value:function(){for(var e=[[],[],[],[]],t=0,i=0;i<this.height;i++)for(var r=0;r<this.width;r++)this.board[i][r]<0&&(this.coor[t][0]=i,this.coor[t][1]=r,e[t][0]=i,e[t][1]=r,t++);return e}},{key:"rotate_piece",value:function(){for(var e=this.update_coor(),t=this.pivot[0],i=this.pivot[1],r=e.slice(),s=0;s<4;s++){var a=[0,0];a[0]=t+(e[s][1]-i),a[1]=i+-(e[s][0]-t),r[s]=a}for(var o=this.board[e[0][0]][e[0][1]],h=0;h<4;h++)this.board[e[h][0]][e[h][1]]=0;var n=this.shift_coor(r,this.pivot,1,0),c=n.new_coor_down,l=n.new_piv_down,d=this.shift_coor(r,this.pivot,-1,0),v=d.new_coor_up,u=d.new_piv_up,p=this.shift_coor(r,this.pivot,0,-1),f=p.new_coor_left,_=p.new_piv_left,b=this.shift_coor(r,this.pivot,0,1),m=b.new_coor_right,g=b.new_piv_right;if(this.coor_is_valid(r));else this.coor_is_valid(c)?(r=c,this.pivot=l):this.coor_is_valid(f)?(r=f,this.pivot=_):this.coor_is_valid(m)?(r=m,this.pivot=g):this.coor_is_valid(v)?(r=v,this.pivot=u):r=e;for(var w=0;w<4;w++)this.board[r[w][0]][r[w][1]]=o;return this.update_ghost(),r}},{key:"shift_coor",value:function(e,t,i,r){for(var s=[],a=0;a<4;a++){var o=[];o[0]=e[a][0]+i,o[1]=e[a][1]+r,s[a]=o}return[s,[t[0]+i,t[1]+r]]}},{key:"shift_piece",value:function(e,t,i){for(var r=this.board[e[0][0]][e[0][1]],s=0;s<4;s++)this.board[e[s][0]][e[s][1]]=0;for(var a=0;a<4;a++)this.board[e[a][0]+t][e[a][1]+i]=r;this.pivot[0]+=t,this.pivot[1]+=i,this.update_ghost()}},{key:"coor_is_valid",value:function(e){for(var t=!0,i=0;i<4;i++){var r=e[i][0],s=e[i][1];if(r>this.board.length-1||r<0||s>this.board[0].length-1||s<0){t=!1;break}this.board[r][s]>1&&(t=!1)}return t}},{key:"move_left",value:function(){var e=this.update_coor(),t=this.shift_coor(e,this.pivot,0,-1)[0];return this.coor_is_valid(t)&&this.shift_piece(e,0,-1),!0}},{key:"move_right",value:function(){var e=this.update_coor(),t=this.shift_coor(e,this.pivot,0,1)[0];return this.coor_is_valid(t)&&this.shift_piece(e,0,1),!0}},{key:"move_drop",value:function(){var e=this,t=this.piece_fall();return this.score_increase(100),clearInterval(this.interval),this.interval=setInterval(function(){e.piece_fall()},this.droptime),t}},{key:"hard_drop",value:function(){for(var e=0,t=this.update_coor(),i=0;i<this.height;i++)for(var r=0;r<this.width;r++)1===this.board[i][r]&&(e=2*(i-t[0][0]-1),this.board[i][r]=this.board[t[0][0]][t[0][1]]);for(var s=0;s<4;s++)this.board[t[s][0]][t[s][1]]=1;return this.score_increase(100*e),this.solidify_piece(),this.over_stack_check(),!0}},{key:"move_hold_swap",value:function(){if(!1===this.hold_swapped){var e=this.update_coor();if(this.hold<2){this.hold=-this.board[e[0][0]][e[0][1]];for(var t=0;t<4;t++)this.board[e[t][0]][e[t][1]]=0;this.next_piece_grab()}else{for(var i=1*-this.board[e[0][0]][e[0][1]],r=0;r<4;r++)this.board[e[r][0]][e[r][1]]=0;this.gen_piece(!0,this.hold),this.hold=1*i}return this.hold_swapped=!0,this.hold}}},{key:"next_piece_grab",value:function(){if(0===this.next[0]||0===this.next[1])for(var e=0;e<3;e++)this.next[e]=this.gen_piece(!1,0);var t=1*this.next[0];return this.next=[this.next[1],this.next[2],this.gen_piece(!1,0)],this.gen_piece(!0,t),t}},{key:"solidify_piece",value:function(){for(var e=this.update_coor(),t=0;t<4;t++)this.board[e[t][0]][e[t][1]]*=-1;this.hold_swapped=!1,this.line_cleared_check(),this.next_piece_grab()}},{key:"update_ghost",value:function(){for(var e=0;e<this.height;e++)for(var t=0;t<this.width;t++)1===this.board[e][t]&&(this.board[e][t]=0);for(var i=this.update_coor(),r=0,s=0,a=!0;a;){r++;for(var o=0;o<4;o++){if(i[o][0]+r>this.board.length-1)a=!1;else this.board[i[o][0]+r][i[o][1]]>1&&(a=!1)}a&&s++}for(var h=0;h<4;h++){0===this.board[i[h][0]+s][i[h][1]]&&(this.board[i[h][0]+s][i[h][1]]=1)}return s}},{key:"line_cleared_check",value:function(){for(var e=[],t=0;t<this.board.length;t++){for(var i=!0,r=0;r<this.board[t].length;r++)this.board[t][r]<=1&&(i=!1);i&&e.push(t)}var s=e.length;this.score_increase(s);for(var a=0;a<s;a++)for(var o=0;o<this.board[e[a]].length;o++)this.board[e[a]][o]=0;for(var h=Math.max.apply(Math,e);h>=0;h--)for(var n=0;n<this.board[h].length;n++)if(this.board[h][n]>1){for(var c=0,l=0;l<s;l++)e[l]>h&&c++;var d=this.board[h][n];this.board[h][n]=0,this.board[h+c][n]=d}return e}},{key:"over_stack_check",value:function(){for(var e=!0,t=0;t<this.board[3].length;t++)this.board[3][t]>0&&(e=!1);if(!0!==e){var i=this.reset_all();this.highscore=Math.max(i[1],this.highscore),this.highlevel=Math.max(i[0],this.highlevel)}}},{key:"time_drop_calc",value:function(){this.droptime=700*Math.pow(.86,.5*this.level)+200}},{key:"level_update",value:function(){this.level=Math.max(this.level,Math.floor((-65+Math.sqrt(13*(325+2*this.score)))/130)),this.time_drop_calc()}},{key:"reset_all",value:function(){var e=this.score,t=this.level;return this.board=[],this.score=0,this.level=0,this.droptime=900,this.pieces=[2,3,4,5,6,7,8],this.pivot=[],this.coor=[[0,0],[0,0],[0,0],[0,0]],this.hold=0,this.hold_swapped=!1,this.next=[0,0,0],this.create_board(),[t,e]}},{key:"score_increase",value:function(e){if(e>4){var t=e/100;this.score=this.score+t*(this.level+1)}else 1===e&&(this.score=this.score+40*(this.level+1)),2===e&&(this.score=this.score+100*(this.level+1)),3===e&&(this.score=this.score+300*(this.level+1)),4===e&&(this.score=this.score+1200*(this.level+1)),this.level_update();return this.score}},{key:"stop_drop",value:function(){clearInterval(this.interval)}},{key:"start_drop",value:function(){var e=this;clearInterval(this.interval),this.interval=setInterval(function(){e.piece_fall()},this.droptime)}}]),e}())(p,f);var b=function(){var e=this,t=Object(n.a)(r.useState[_.board],2),i=t[0],a=t[1];return Object(r.useEffect)(function(){e.timerID=setInterval(function(){return a(_.board)},100)},_.board),u(function(e){switch(e){case"ArrowLeft":_.move_left();break;case"ArrowRight":_.move_right();break;case"ArrowDown":_.move_drop();break;case"ArrowUp":_.rotate_piece();break;case"h":_.move_hold_swap();break;case"-":_.stop_drop();break;case"=":_.start_drop();break;case" ":_.hard_drop()}}),s.a.createElement("div",{className:"TetrisGame"},s.a.createElement("h2",null,"Interval: ".concat(_.interval)),s.a.createElement(l,{inputboard:i}),s.a.createElement(c,{inputboard:i,inputheight:f,inputwidth:p}))};o.a.render(s.a.createElement(b,null),document.getElementById("root")),h()},6:function(e,t,i){e.exports=i(12)}},[[6,1,2]]]);
//# sourceMappingURL=main.d25d039c.chunk.js.map