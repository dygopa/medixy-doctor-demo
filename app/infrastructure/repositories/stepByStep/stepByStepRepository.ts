import { supabase } from 'infrastructure/config/supabase/supabase-client';
import { AuthFailure, authFailuresEnum } from 'domain/core/failures/auth/authFailure';

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

            if(snapshots.error) throw new AuthFailure(snapshots.statusText);

            return snapshots.data;
        } catch (error) {
            const exception = error as AuthFailure;
            return new AuthFailure(exception.code);
        }
    }

    async getSteps(id:string): Promise<any | AuthFailure> {
        try {

            const snapshots = await supabase.from("EventosUsuarios").select().eq("usuarioId", parseInt(id));

            const data: any = [];

            if(snapshots.error)throw new AuthFailure(snapshots.statusText)

            if (snapshots.data.length > 0) {
                const list: string[] = [];

                snapshots.data.forEach((snapshot) => {
                    if (list.indexOf(snapshot.evento) < 0) {
                        data.push(snapshot)
                        list.push(snapshot.evento)
                    }
                });
            }
            
            return data;
        } catch (error) {
            console.log(error)
            const exception = error as AuthFailure;
            return new AuthFailure(exception.code);
        }
    }

}