import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationClaim';
import { OperationClaimsService } from 'src/app/services/operation-claims.service';

@Component({
  selector: 'app-operationclaims',
  templateUrl: './operationclaims.component.html',
  styleUrls: ['./operationclaims.component.css']
})
export class OperationclaimsComponent implements OnInit {

  public rolesInSystem:OperationClaim[] = []
  public predefinedRoles:OperationClaim[] = []
  public noActiveRoleInSystem:boolean = false;
  public loaded:boolean = false;

  constructor(private operationClaimsService:OperationClaimsService, private toasterService:ToastrService) { }

  ngOnInit(): void {
    this.getRolesInSystem()
    this.getPredefinedRoles()
  }

  getRolesInSystem(){
    this.operationClaimsService.getRolesInSystem().subscribe(response=>{
      this.rolesInSystem = response.data
      this.loaded = true;
      if (response.data == null || response.data.length == 0) {
        this.noActiveRoleInSystem = true;
      }
    },responseError=>{
      this.noActiveRoleInSystem = true
    })
  }

  getPredefinedRoles(){
    this.operationClaimsService.getPredefinedRoles().subscribe(response=>{
      this.predefinedRoles = response.data
    })
  }

  addRoleToSystem(){
    let selectedRole = document.getElementById('roleSelect') as HTMLInputElement
    let roleToAdd:OperationClaim = {} as OperationClaim
    roleToAdd.name = selectedRole.value;    
    this.operationClaimsService.addRole(roleToAdd).subscribe(response=>{
      this.toasterService.success(response.message,"Başarılı")
      this.getRolesInSystem()
    },responseError=>{
      this.toasterService.error(responseError.error.message,"Hata")
    })
  }

  deleteRole(operationClaim:OperationClaim){
    this.operationClaimsService.deleteRole(operationClaim).subscribe(response=>{
      this.toasterService.success(response.message,"Başarılı")
      this.getRolesInSystem()
    },responseError=>{
      this.toasterService.error(responseError.error.message,"Hata")
    })
  }

}
