import { Injectable }  from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class LoginNotifier{
    loginNotifier:Subject<string> = new Subject();
    getLoginNotifier(){
        return this.loginNotifier;
    }
    broadCastLoginNotifier(obj){
        this.loginNotifier.next(obj);
    }
}
