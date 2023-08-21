import { IUser } from 'domain/core/entities/userEntity';
import { SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { supabase } from 'infrastructure/config/supabase/supabase-client';
import nookies from 'nookies';
import { getTokenMessaging } from 'infrastructure/config/firebase/firebase-client';
import { AuthFailure, authFailuresEnum } from 'domain/core/failures/auth/authFailure';
import { AUTH_ENDPOINT, GET_USER_ENDPOINT } from 'infrastructure/config/api/dictionary';

export default interface IStepByStepRepository {
    createUserSteps(id:string, event: string): Promise<any | AuthFailure>;
    getSteps(id:string): Promise<any | AuthFailure>;
}

export class StepByStepRepository implements IStepByStepRepository {

    async createUserSteps(id:string, event: string): Promise<any | AuthFailure> {
        try {
            const stepAlreadyExist = await supabase.from("EventosUsuarios").select().eq("usuarioId", parseInt(id)).eq("evento", event)

            if(stepAlreadyExist.data && stepAlreadyExist.data?.length > 0 ){
                return new AuthFailure("NOT_CREATED");
            }
            
            const snapshots = await supabase.from("EventosUsuarios").insert({
                evento: event,
                usuarioId: parseInt(id)
            });

            if(!snapshots.error) throw new AuthFailure(snapshots.statusText);

            return snapshots.data;
        } catch (error) {
            const exception = error as AuthFailure;
            return new AuthFailure(exception.code);
        }
    }

    async getSteps(id:string): Promise<any | AuthFailure> {
        try {

            const snapshots = await supabase.from("EventosUsuarios").select().eq("usuarioId", parseInt(id));

            if(snapshots.error)throw new AuthFailure(snapshots.statusText)
            console.log(snapshots.data)
            return snapshots.data;
        } catch (error) {
            console.log(error)
            const exception = error as AuthFailure;
            return new AuthFailure(exception.code);
        }
    }

}