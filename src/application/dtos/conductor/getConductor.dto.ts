import { type Conductor } from "../../../domain/entities/conductor.entity";

export class GetConductorDto {
  private constructor(
    private compartirFichaMedica: boolean
  ) {}

  public static create(conductor: Conductor): GetConductorDto {
    return new GetConductorDto(
      conductor.getCompartirFichaMedica()
    );
  }
}